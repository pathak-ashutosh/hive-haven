'use client'

import { motion } from 'framer-motion'

const steps = [
  { title: 'Enter Your University', description: "Tell us where you'll be studying in the US." },
  { title: 'Browse Options', description: 'Explore a curated list of student-friendly accommodations.' },
  { title: 'Book with Confidence', description: 'Secure your new home with our easy booking process.' },
]

const HowItWorks = () => {
  return (
    <section className="py-16 bg-secondary/10">
      <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">How It Works</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div 
            key={step.title}
            className="bg-background p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-primary">{`${index + 1}. ${step.title}`}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks