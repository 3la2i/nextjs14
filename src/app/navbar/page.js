'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Home, LogIn, LogOut, ShoppingCart, User, Book, Mountain, Menu, X } from 'lucide-react'
import { useCart } from '../context/cartcontext'

const Header = () => {
  const router = useRouter()
  const { cartItemsCount } = useCart()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/status')
      if (response.ok) {
        const data = await response.json()
        setIsLoggedIn(data.isLoggedIn)
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
    }
  }

  const handleAuthAction = async () => {
    if (isLoggedIn) {
      const response = await fetch('/api/auth/logout', { method: 'POST' })
      if (response.ok) {
        setIsLoggedIn(false)
        router.push('/login')
      }
    } else {
      router.push('/login')
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2 text-black">
            <Mountain className="w-8 h-8 text-green-700" />
            <span className="text-4xl font-bold">Green Book<span className="text-green-700">.</span></span>
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="/products" className="text-sm font-medium hover:underline underline-offset-4">
              Products
            </Link>
            <Link href="/books" className="text-sm font-medium hover:underline underline-offset-4">
              Books
            </Link>
            <Link href="/ContactUs" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
            <Link href="/community" className="text-sm font-medium hover:underline underline-offset-4">
              Community
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="text-sm font-medium hover:underline underline-offset-4 flex items-center">
              <ShoppingCart className="w-5 h-5 mr-1" />
              Cart
              {cartItemsCount > 0 && (
                <span className="ml-1 bg-green-700 text-white rounded-full px-2 py-1 text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <>
                <Link href="/profile" className="text-sm font-medium hover:underline underline-offset-4 flex items-center">
                  <User className="w-5 h-5 mr-1" />
                  Profile
                </Link>
                <button onClick={handleAuthAction} className="text-sm font-medium hover:underline underline-offset-4 flex items-center">
                  <LogOut className="w-5 h-5 mr-1" /> Logout
                </button>
              </>
            ) : (
              <button onClick={handleAuthAction} className="text-sm font-medium hover:underline underline-offset-4 flex items-center">
                <LogIn className="w-5 h-5 mr-1" /> Login
              </button>
            )}
          </div>

          <button
            className="md:hidden text-green-700"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white py-4">
            <div className="flex flex-col space-y-4">
              <Link href="/about" className="text-sm font-medium hover:text-green-700" onClick={closeMobileMenu}>
                About
              </Link>
              <Link href="/products" className="text-sm font-medium hover:text-green-700" onClick={closeMobileMenu}>
                Products
              </Link>
              <Link href="/books" className="text-sm font-medium hover:text-green-700" onClick={closeMobileMenu}>
                Books
              </Link>
              <Link href="/ContactUs" className="text-sm font-medium hover:text-green-700" onClick={closeMobileMenu}>
                Contact
              </Link>
              <Link href="/community" className="text-sm font-medium hover:text-green-700" onClick={closeMobileMenu}>
                Community
              </Link>
              <Link href="/cart" className="text-sm font-medium hover:text-green-700 flex items-center" onClick={closeMobileMenu}>
                <ShoppingCart className="w-5 h-5 mr-1" />
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 bg-green-700 text-white rounded-full px-2 py-1 text-xs">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {isLoggedIn ? (
                <>
                  <Link href="/profile" className="text-sm font-medium hover:text-green-700 flex items-center" onClick={closeMobileMenu}>
                    <User className="w-5 h-5 mr-1" />
                    Profile
                  </Link>
                  <button onClick={() => { handleAuthAction(); closeMobileMenu(); }} className="text-sm font-medium hover:text-green-700 flex items-center">
                    <LogOut className="w-5 h-5 mr-1" /> Logout
                  </button>
                </>
              ) : (
                <button onClick={() => { handleAuthAction(); closeMobileMenu(); }} className="text-sm font-medium hover:text-green-700 flex items-center">
                  <LogIn className="w-5 h-5 mr-1" /> Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header