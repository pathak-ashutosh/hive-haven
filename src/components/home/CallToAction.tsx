'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

const CallToAction = () => {
  return (
    <motion.section 
      className="py-20 text-center bg-primary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-primary-foreground">Ready to Find Your New Home?</h2>
        <p className="text-xl mb-8 text-primary-foreground/80">Join thousands of students who&apos;ve found their perfect accommodation with HiveHaven.</p>
        <Button size="lg" variant="destructive" useNextLink href="/signup">Get Started</Button>
      </div>
    </motion.section>
  )
}

export default CallToAction