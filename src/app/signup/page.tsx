'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [userType, setUserType] = useState('student')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const captchaRef = useRef<HCaptcha>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!captchaToken) {
      setError('Please complete the captcha')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone,
            user_type: userType
          }
        }
      })
      if (error) throw error
      if (user) {
        await supabase.from('users').insert({
          id: user.id,
          email,
          first_name: firstName,
          last_name: lastName,
          phone,
          user_type: userType
        })
      }
      router.push('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setLoading(false)
      captchaRef.current?.resetCaptcha()
    }
  }

  return (
    <div className="my-24 min-h-screen bg-background flex items-center justify-center">
      <div className="bg-card p-8 rounded-lg shadow-md w-full max-w-md md:max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign up for HiveHaven</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSignup} className="space-y-4">
          <div className='grid grid-cols-2 gap-8'>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1">Password</label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label htmlFor="firstName" className="block mb-1">First Name</label>
              <Input 
                id="firstName" 
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-1">Last Name</label>
              <Input 
                id="lastName" 
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-1">Phone</label>
              <Input 
                id="phone" 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label htmlFor="userType" className="block mb-1">User Type</label>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="student">Student</option>
                <option value="landlord">Landlord</option>
              </select>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </Button>
          <div className='flex justify-center'>
            <HCaptcha
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ''}
              onVerify={setCaptchaToken}
              ref={captchaRef}
            />
          </div>
        </form>
      </div>
    </div>
  )
}