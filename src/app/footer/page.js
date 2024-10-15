import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[#588b4963] text-[#3b4738f3] py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-700">About Us</h3>
          <p className="text-sm">
            Exchange is dedicated to promoting sustainable reading practices and environmental consciousness through book exchanges.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-700">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li><Link href="/" className="hover:text-green-700 transition-colors duration-300">Home</Link></li>
            <li><Link href="/about" className="hover:text-green-700 transition-colors duration-300">About</Link></li>
            <li><Link href="/books" className="hover:text-green-700 transition-colors duration-300">Books</Link></li>
            <li><Link href="/ContactUs" className="hover:text-green-700 transition-colors duration-300">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-700">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-700 transition-colors duration-300">
              <Facebook className="w-6 h-6" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="hover:text-green-700 transition-colors duration-300">
              <Twitter className="w-6 h-6" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="hover:text-green-700 transition-colors duration-300">
              <Instagram className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-green-700 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Exchange. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer