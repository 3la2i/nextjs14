"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

export default function UserProfile() {
  const [profile, setProfile] = useState(null)
  const [userBooks, setUserBooks] = useState([])
  const [userTransactions, setUserTransactions] = useState([])
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [updatedProfile, setUpdatedProfile] = useState(null)

  useEffect(() => {
    fetchProfile()
    fetchUserTransactions()
  }, [])


  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/users', {
        withCredentials: true
      })
      setProfile(response.data)
      setUpdatedProfile(response.data)
      fetchUserBooks(response.data._id)
      fetchUserTransactions(response.data._id)
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred')
    }
  }

  const fetchUserBooks = async (userId) => {
    try {
      const response = await axios.get(`/api/books/user?userId=${userId}`, {
        withCredentials: true
      })
      setUserBooks(response.data)
    } catch (err) {
      console.error('Error fetching user books:', err)
      setUserBooks([])
    }
  }

  const fetchUserTransactions = async (userId) => {
    try {
      const response = await axios.get(`/api/users/transactions?userId=${userId}`, {
        withCredentials: true
      })
      setUserTransactions(response.data)
    } catch (err) {
      console.error('Error fetching user transactions:', err)
      setUserTransactions([])
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUpdatedProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put('/api/users', updatedProfile, {
        withCredentials: true
      })
      setProfile(response.data)
      setIsEditing(false)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile')
    }
  }

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`/api/books/${bookId}`, {
          withCredentials: true
        })
        setUserBooks(prevBooks => prevBooks.filter(book => book._id !== bookId))
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete book')
      }
    }
  }

  if (!profile) return <LoadingDisplay />

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        {isEditing ? (
          <EditProfileForm 
          profile={updatedProfile} 
          onInputChange={handleInputChange} 
          onSubmit={handleSubmit} 
          onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <ProfileHeader profile={profile} />
          <EditProfileButton onClick={() => setIsEditing(true)} />
          </>
        )}
        
        <UserBooks books={userBooks} onDeleteBook={handleDeleteBook} />
        <UserTransactions transactions={userTransactions} />
      </main>
    </div>
  )
}

const LoadingDisplay = () => (
  <div className="flex items-center justify-center h-screen bg-white">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-700 mx-auto"></div>
      <p className="mt-4 text-xl font-semibold text-green-700">Loading...</p>
    </div>
  </div>
)

const ProfileHeader = ({ profile }) => (
  <div className="bg-green-50 rounded-lg shadow-md p-6 mb-8">
    <div className="flex flex-col md:flex-row items-center md:items-start">
      <Image
        src={profile.imageUrl || "https://img.icons8.com/?size=100&id=FZQamLEORsJ1&format=png&color=000000"}
        alt=""
        width={120}
        height={120}
        className="rounded-full mb-4 md:mb-0 md:mr-6"
      />
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-green-700 mb-2">{profile.name}</h1>
        <p className="text-green-700 mb-1">{profile.email}</p>
        <p className="text-green-700 mb-1">{profile.location}</p>
        <p className="text-green-700 mb-2">Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${profile.isActive ? 'bg-green-600 text-white' : 'bg-green-200 text-green-800'}`}>
          {profile.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
    </div>
  </div>
)
const EditProfileButton = ({ onClick }) => (
  <div className="mt-8 text-center">
    <button 
      onClick={onClick}
      className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-lg text-lg inline-flex items-center"
    >
      Edit Profile
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    </button>
  </div>

)

const EditProfileForm = ({ profile, onInputChange, onSubmit, onCancel }) => (
  <form onSubmit={onSubmit} className="bg-green-50 rounded-lg shadow-md p-6 mb-8">
    <h2 className="text-2xl font-semibold text-green-700 mb-4">Edit Profile</h2>
    <div className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-green-700 font-medium mb-1">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={profile.name}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-green-700 font-medium mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={profile.email}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-green-700 font-medium mb-1">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={profile.location}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>
    </div>
    <div className="mt-6 flex justify-end space-x-4">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 border border-green-700 text-green-700 rounded-md hover:bg-green-700 hover:text-white"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600"
      >
        Save Changes
      </button>
    </div>
  </form>
)

const UserBooks = ({ books, onDeleteBook }) => (
  <div className="mt-12">
    <h2 className="text-2xl font-semibold text-green-700 mb-6">Your Books</h2>
    {books.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map(book => (
          <BookCard key={book._id} book={book} onDelete={onDeleteBook} />
        ))}
      </div>
    ) : (
      <p className="text-green-700 text-lg">You haven't posted any books yet.</p>
    )}
    <div className="mt-8 text-center">
      <Link href="/books/add" className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-lg text-lg inline-flex items-center">
        Add New Book
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </Link>
    </div>
  </div>
)

const BookCard = ({ book, onDelete }) => (
  <div className="bg-green-50 rounded-lg shadow-md overflow-hidden">
    <Image
      src={book.imageUrl}
      alt={book.title}
      width={300}
      height={200}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-green-700 mb-2">{book.title}</h3>
      <p className="text-green-700 mb-1">Author: {book.author}</p>
      <p className="text-green-700 mb-1">Condition: {book.condition}</p>
      <p className="text-green-700 mb-2">Location: {book.location}</p>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => onDelete(book._id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)

const UserTransactions = ({ transactions }) => (
  <div className="mt-12">
    <h2 className="text-2xl font-semibold text-green-700 mb-6">Your Transactions</h2>
    {transactions.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-100">
              <th className="p-3 text-green-700">Transaction ID</th>
              <th className="p-3 text-green-700">Amount</th>
              <th className="p-3 text-green-700">Status</th>
              <th className="p-3 text-green-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction._id} className="border-b border-green-200">
                <td className="p-3 text-green-700">{transaction.transactionId}</td>
                <td className="p-3 text-green-700">${transaction.amount.toFixed(2)}</td>
                <td className="p-3 text-green-700">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.status === 'completed' ? 'bg-green-200 text-green-800' :
                    transaction.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="p-3 text-green-700">{new Date(transaction.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-green-700 text-lg">You don't have any transactions yet.</p>
    )}
  </div>
)