'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const features = [
  { title: 'Verified Listings', description: 'All our accommodations are verified for quality and safety.' },
  { title: 'Student-Friendly', description: 'Options tailored to student needs and budgets.' },
  { title: 'Easy Booking', description: 'Simple process with clear terms and conditions.' },
  { title: '24/7 Support', description: 'Our team is always here to help you.' },
]

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">Why Choose <span className='text-primary'>hive</span>Haven?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CheckCircle className="text-primary mr-2 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))};
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;