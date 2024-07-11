'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import ThemeToggle from '@/components/ThemeToggle'
import { supabase } from '@/lib/supabase-client'
import { User } from '@supabase/supabase-js'
import Image from 'next/image'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { Menu as MenuIcon, X as XIcon } from 'lucide-react'
    
const Header = () => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-foreground">
          <Image
            src="/logo.svg"
            alt="HiveHaven Logo"
            width={32}
            height={32}
            className="text-primary rounded-lg"
          />
          <span className='text-primary'>hive</span>Haven
        </Link>
        <div className="flex items-center space-x-4 max-md:hidden">
          <ThemeToggle />
          <Link href="/properties" className="text-foreground hover:text-primary transition-colors">Properties</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">Dashboard</Link>
              <Button onClick={handleLogout}>Log Out</Button>
            </>
          ) : (
            <>
              <Button href="/login" variant="outline" useNextLink className='border-primary hover:border-accent text-primary'>Log In</Button>
              <Button href="/signup" useNextLink>Sign Up</Button>
            </>
          )}
        </div>
        <div className="md:hidden">
          <Menu as="div" className="relative">
            {({ open }) => (
              <>
                <MenuButton className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none">
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </MenuButton>
                <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-background border border-border rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <MenuItem>
                        <Link href="/properties" className={`block px-4 py-2 text-sm data-[focus]:bg-primary data-[focus]text-white text-foreground'}`}>
                          Properties
                        </Link>
                    </MenuItem>
                    {user ? (
                      <>
                        <MenuItem>
                          <Link href="/dashboard" className={`block px-4 py-2 text-sm data-[focus]:bg-primary data-[focus]text-white text-foreground'}`}>
                            Dashboard
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <button onClick={handleLogout} className={`block w-full text-left px-4 py-2 text-sm data-[focus]:bg-primary data-[focus]text-white text-foreground'}`}>
                            Log Out
                          </button>
                        </MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem>
                          <Link href="/login" className={`block px-4 py-2 text-sm data-[focus]:bg-primary data-[focus]text-white text-foreground'}`}>
                            Log In
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link href="/signup" className={`block px-4 py-2 text-sm data-[focus]:bg-primary data-[focus]text-white text-foreground'}`}>
                            Sign Up
                          </Link>
                        </MenuItem>
                      </>
                    )}
                  </div>
                </MenuItems>
              </>
            )}
          </Menu>
        </div>
      </nav>
    </header>
  )
}

export default Header