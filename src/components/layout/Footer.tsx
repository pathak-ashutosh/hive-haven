// src/components/layout/Footer.tsx
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">HiveHaven</h3>
            <p className="text-secondary-foreground/80">Making student accommodation easy.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p className="text-secondary-foreground/80">support@hivehaven.com</p>
            <p className="text-secondary-foreground/80">1-800-HIVE-HAVEN</p>
          </div>
        </div>
        <div className="mt-8 text-center text-secondary-foreground/60">
          <p>&copy; 2024 HiveHaven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer