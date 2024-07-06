'use client'
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { motion, type HTMLMotionProps } from 'framer-motion'
import Link from 'next/link'

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-destructive-foreground dark:text-secondary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonVariantProps = VariantProps<typeof buttonVariants>

const motionProps = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
}

const MotionButton = React.forwardRef<HTMLButtonElement, HTMLMotionProps<"button"> & ButtonVariantProps>(
  ({ className, variant, size, ...props }, ref) => (
    <motion.button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...motionProps}
      {...props}
    />
  )
)
MotionButton.displayName = "MotionButton"

const MotionLink = React.forwardRef<HTMLAnchorElement, HTMLMotionProps<"a"> & ButtonVariantProps & { href: string }>(
  ({ className, variant, size, href, ...props }, ref) => (
    <motion.a
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...motionProps}
      href={href}
      {...props}
    />
  )
)
MotionLink.displayName = "MotionLink"

type ButtonProps = ButtonVariantProps & (
  | ({ href: string } & HTMLMotionProps<"a">)
  | (HTMLMotionProps<"button">)
) & {
  useNextLink?: boolean
}

const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const { href, useNextLink, ...rest } = props as ButtonProps & { href?: string, useNextLink?: boolean }
  
  if (href) {
    if (useNextLink) {
      return (
        <Link href={href} passHref legacyBehavior>
          <MotionLink {...rest as HTMLMotionProps<"a"> & ButtonVariantProps} ref={ref as React.Ref<HTMLAnchorElement>} href={href} />
        </Link>
      )
    }
    return <MotionLink {...rest as HTMLMotionProps<"a"> & ButtonVariantProps} ref={ref as React.Ref<HTMLAnchorElement>} href={href} />
  }
  return <MotionButton {...rest as HTMLMotionProps<"button"> & ButtonVariantProps} ref={ref as React.Ref<HTMLButtonElement>} />
})

Button.displayName = "Button"

export { Button, buttonVariants }