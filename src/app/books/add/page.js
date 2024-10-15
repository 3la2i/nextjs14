"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf } from 'lucide-react';

const FlippingBookForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    condition: 'new',
    location: '',
    imageUrl: '',
    contactInfo: {
      email: '',
      phone: '',
    },
  });
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email' || name === 'phone') {
      setFormData(prevState => ({
        ...prevState,
        contactInfo: {
          ...prevState.contactInfo,
          [name]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.ok) {
        router.push('/books');
      } else if (response.status === 401) {
        router.push('/login');
      } else {
        const data = await response.json();
        console.error('Failed to add book:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const nextPage = () => {
    if (currentPage < 2) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="perspective-1000 relative">
            <div className={`book-cover ${currentPage > 0 ? 'flipped' : ''}`}>
              <div className="front p-8 text-center">
                <Leaf className="mx-auto h-12 w-12 text-[#588b49f3]" />
                <h1 className="mt-2 text-3xl font-bold text-[#588b49f3]">Add a New Book</h1>
                <p className="mt-2 text-sm text-gray-600">Share your book with the eco-community!</p>
               
              </div>
              <div className="back" />
            </div>
            <div className={`book-page ${currentPage > 0 ? 'visible' : ''}`}>
              <form onSubmit={handleSubmit} className="p-8 space-y-4">
                {currentPage === 1 && (
                  <>
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#a2e08ff3] focus:border-[#a2e08ff3]"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="author" className="block text-sm font-medium text-gray-700">Owner</label>
                      <input
                        id="author"
                        name="author"
                        type="text"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#a2e08ff3] focus:border-[#a2e08ff3]"
                        value={formData.author}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition</label>
                      <select
                        id="condition"
                        name="condition"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#a2e08ff3] focus:border-[#a2e08ff3]"
                        value={formData.condition}
                        onChange={handleInputChange}
                      >
                        <option value="new">New</option>
                        <option value="used">Used</option>
                      </select>
                    </div>
                  </>
                )}
                {currentPage === 2 && (
                  <>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#a2e08ff3] focus:border-[#a2e08ff3]"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                      <input
                        id="imageUrl"
                        name="imageUrl"
                        type="text"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#a2e08ff3] focus:border-[#a2e08ff3]"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Contact Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#a2e08ff3] focus:border-[#a2e08ff3]"
                        value={formData.contactInfo.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Contact Phone (optional)</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#a2e08ff3] focus:border-[#a2e08ff3]"
                        value={formData.contactInfo.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  {currentPage > 0 && (
                    <button type="button" onClick={prevPage} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300">
                      Previous
                    </button>
                  )}
                  {currentPage < 2 ? (
                    <button type="button" onClick={nextPage} className="bg-[#a2e08ff3] hover:bg-[#588b49f3] text-white font-bold py-2 px-4 rounded transition duration-300">
                      Next
                    </button>
                  ) : (
                    <button type="submit" className="bg-[#a2e08ff3] hover:bg-[#588b49f3] text-white font-bold py-2 px-4 rounded transition duration-300">
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlippingBookForm;