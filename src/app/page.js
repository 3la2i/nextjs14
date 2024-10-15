'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Book, Recycle, Globe, ChevronLeft, ChevronRight } from 'lucide-react'
import axios from 'axios'

const VisionCard = ({ icon, title, description, image }) => (
  <div className="bg-green-50 rounded-lg shadow-md p-6 flex flex-col items-center w-full sm:w-[30%] mb-8">
    <Image src={image} alt={title} width={300} height={200} className="w-full h-40 object-cover rounded-t-lg mb-4" />
    <div className="text-center">
      {icon}
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="text-green-700">{description}</p>
    </div>
  </div>
)

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
   
    <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-48 object-contain rounded-md mb-4"
                          />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-green-700 mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
      <Link href="/products">
      <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
        View Marketplace
      </button>
      </Link>
    </div>
  </div>
)

export default function Home() {
  const [products, setProducts] = useState([])
  const [currentProductIndex, setCurrentProductIndex] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products')
        setProducts(response.data.slice(0, 3))
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  const nextProduct = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length)
  }

  const prevProduct = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-green-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-green-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Join the </span>
                  <span className="block text-green-600 xl:inline">Book Exchange</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Every book you exchange is a tree you save. Join us on a journey of sustainable reading, 
                  where we enrich our minds and protect our planet simultaneously.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link href="/books" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10">
                      Start Exchanging
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link href="/about" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Books on a shelf"
            width={1000}
            height={1000}
          />
        </div>
      </div>

      {/* Vision Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Our Vision</h2>
          <p className="text-xl text-center mb-12 max-w-3xl mx-auto text-gray-600">
            We envision a world where books continue to enrich lives without depleting our planet's resources. 
            By promoting book exchange and responsible reuse, we aim to reduce waste and minimize the environmental impact of book production and disposal.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <VisionCard 
              icon={<Book size={48} className="text-green-600" />}
              title="Enrich Lives"
              description="Continue to spread knowledge and imagination through books"
              image="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80"
            />
            <VisionCard 
              icon={<Recycle size={48} className="text-green-600" />}
              title="Reduce Waste"
              description="Promote book exchange and responsible reuse"
              image="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            />
            <VisionCard 
              icon={<Globe size={48} className="text-green-600" />}
              title="Protect the Planet"
              description="Minimize environmental impact of book production and disposal"
              image="https://images.unsplash.com/photo-1569163139599-0f4517e36f51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            />
          </div>
        </div>
      </section>

      {/* Marketplace Slider */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Featured Products</h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentProductIndex * 100}%)` }}>
                {products.map((product, index) => (
                  <div key={product._id} className="w-full flex-shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={prevProduct}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            >
              <ChevronLeft className="text-green-600" />
            </button>
            <button
              onClick={nextProduct}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            >
              <ChevronRight className="text-green-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-green-100">Join our community of book lovers and environmental enthusiasts today!</p>
          <Link href="/signup" className="bg-white text-green-600 font-bold py-3 px-8 rounded-lg hover:bg-green-100 transition-colors">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  )
}