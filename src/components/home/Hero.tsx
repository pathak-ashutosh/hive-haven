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
      className="py-20 text-center min-h-screen flex flex-col justify-center items-center"
      initial="initial"
      animate="animate"
      variants={stagger}
    >
      <motion.h1 className="text-6xl font-bold mb-4 text-primary-foreground dark:text-primary" variants={fadeInUp} transition={{ duration: 0.6 }}>
        Find Your Perfect Student Home in the US
      </motion.h1>
      <motion.p className="text-xl mb-8 text-muted-foreground" variants={fadeInUp} transition={{ duration: 0.6 }}>
        HiveHaven makes it easy for international students to find comfortable and affordable accommodation.
      </motion.p>
      <motion.div className="flex justify-center mb-8" variants={fadeInUp} transition={{ duration: 0.6 }}>
        <Input placeholder="Enter your university" className="mr-2 w-64" />
        <Button className="bg-secondary text-destructive-foreground dark:text-secondary-foreground hover:bg-secondary/90">Search</Button>
      </motion.div>
      <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
        <Button href="/signup" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-destructive-foreground dark:hover:text-secondary-foreground">Sign up for early access</Button>
      </motion.div>
    </motion.section>
  )
}

export default Hero
