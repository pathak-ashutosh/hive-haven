'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

const stagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const Hero = () => {
  return (
    <motion.section 
      className="pt-20 sm:pt-28 md:pt-36 lg:pt-40 pb-10 sm:pb-16 md:pb-20 text-center min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8"
      initial="initial"
      animate="animate"
      variants={stagger}
    >
      <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-primary-foreground dark:text-primary" variants={fadeInUp} transition={{ duration: 0.6 }}>
        Find Your Perfect<br/> Student <span className='text-primary dark:text-accent'>Home</span> in the US
      </motion.h1>
      <motion.p className="text-lg sm:text-xl lg:text-2xl mb-8 text-muted-foreground" variants={fadeInUp} transition={{ duration: 0.6 }}>
        HiveHaven makes it easy for international students<br/> to find comfortable and affordable accommodation.
      </motion.p>
      <motion.div className="flex flex-col xs:flex-row justify-center mb-8 w-full max-w-md mx-auto" variants={fadeInUp} transition={{ duration: 0.6 }}>
        <Input placeholder="Enter your university" className="mb-2 xs:mb-0 xs:mr-2 w-full xs:w-64 text-sm xs:text-base" />
        <Button className="bg-secondary text-destructive-foreground dark:text-secondary-foreground hover:bg-secondary/90 text-sm sm:text-base">Search</Button>
      </motion.div>
      <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
        <Button href="/signup" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-destructive-foreground dark:hover:text-secondary-foreground text-sm sm:text-base">Sign up for early access</Button>
      </motion.div>
    </motion.section>
  )
}

export default Hero
