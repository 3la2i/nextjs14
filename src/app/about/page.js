import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Book, Recycle, Globe, Users, Lightbulb, Heart } from 'lucide-react'

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
            About <span className="text-green-700">Eco-Action Tracker</span>
          </h1>
          <p className="text-xl text-center mb-8 max-w-3xl mx-auto">
            Empowering individuals and communities to take meaningful action against climate change through sustainable reading practices.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Our Mission</h2>
          <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
            At Eco-Action Tracker, our mission is to empower individuals and communities to take meaningful action against climate change through sustainable reading practices. We believe that small, consistent actions like book exchanges can lead to significant positive impacts on our environment.
          </p>
        </div>
      </section>

      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Our Story</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <p className="text-xl mb-4">
                Eco-Action Tracker was founded in 2020 by a group of environmental enthusiasts and book lovers who recognized the need for a user-friendly platform to encourage and track eco-friendly actions related to reading.
              </p>
              <p className="text-xl">
                What started as a small project among friends quickly grew into a global movement, connecting like-minded individuals passionate about making a difference in their daily lives and communities through sustainable reading practices.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image 
                src="/placeholder.svg?height=300&width=500" 
                alt="Eco-Action Tracker founders" 
                width={500} 
                height={300} 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Book className="w-12 h-12 text-green-600" />, title: "Sustainability", description: "We promote sustainable reading practices in all aspects of life, from individual choices to community initiatives." },
              { icon: <Recycle className="w-12 h-12 text-green-600" />, title: "Education", description: "We believe in the power of knowledge and strive to provide accurate, up-to-date information on environmental issues and solutions through reading." },
              { icon: <Users className="w-12 h-12 text-green-600" />, title: "Community", description: "We foster a supportive community where members can share books, ideas, challenges, and successes in their eco-friendly reading journeys." },
              { icon: <Lightbulb className="w-12 h-12 text-green-600" />, title: "Innovation", description: "We continuously seek innovative ways to tackle environmental challenges through reading and improve our book exchange platform." },
              { icon: <Globe className="w-12 h-12 text-green-600" />, title: "Transparency", description: "We are committed to being open about our operations, partnerships, and the impact of our collective actions in the realm of sustainable reading." },
              { icon: <Heart className="w-12 h-12 text-green-600" />, title: "Inclusivity", description: "We welcome and value diverse perspectives, recognizing that environmental issues and the love for reading affect us all." },
            ].map((value, index) => (
              <div key={index} className="bg-green-50 rounded-lg p-6 flex flex-col items-center text-center">
                {value.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{value.title}</h3>
                <p className="text-green-800">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Jane Doe", role: "Founder & CEO", image: "/placeholder.svg?height=150&width=150" },
              { name: "John Smith", role: "CTO", image: "/placeholder.svg?height=150&width=150" },
              { name: "Emily Brown", role: "Head of Sustainability", image: "/placeholder.svg?height=150&width=150" },
              { name: "Michael Chen", role: "Community Manager", image: "/placeholder.svg?height=150&width=150" },
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg p-6 flex flex-col items-center text-center shadow-md">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  width={150} 
                  height={150} 
                  className="rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-green-700">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Our Impact</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <p className="text-4xl font-bold text-green-700 mb-2">1M+</p>
              <p className="text-xl text-green-800">Active Users</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <p className="text-4xl font-bold text-green-700 mb-2">5M+</p>
              <p className="text-xl text-green-800">Books Exchanged</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <p className="text-4xl font-bold text-green-700 mb-2">100K+</p>
              <p className="text-xl text-green-800">Trees Saved</p>
            </div>
          </div>
          <p className="text-xl text-center mt-8">
            Together, we're making a measurable difference in the fight against climate change through sustainable reading practices.
          </p>
        </div>
      </section>



      <section className="py-16 text-center bg-green-700 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8">
            Be part of the change. Start exchanging books and tracking your eco-friendly actions to inspire others.
          </p>
          <Link 
            href="/signup" 
            className="bg-white text-green-700 font-bold py-3 px-6 rounded-lg transition duration-300 inline-flex items-center hover:bg-green-100"
          >
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}