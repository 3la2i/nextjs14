'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import Swal from 'sweetalert2';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCondition, setFilterCondition] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [exchangeRequest, setExchangeRequest] = useState({
    userBook: '',
    school: '',
    date: '',
    time: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8; // Number of books to display per page
  const router = useRouter();

  const schools = ['Fatima bnt Al-khatab', 'Alramlah School', 'Aisha bnt Abi Bakr', 'Al-mohalab'];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books', { credentials: 'include' });
        if (response.status === 401) {
          router.push('/login');
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBooks(data);
      } catch (e) {
        console.error('Failed to fetch books:', e);
        setError('Failed to load books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [router]);

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCondition = filterCondition === 'all' || book.condition === filterCondition;
    return matchesSearch && matchesCondition;
  });

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleExchange = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
    setExchangeRequest({
      userBook: '',
      school: '',
      date: '',
      time: '',
    });
  };

  const handleExchangeSubmit = async (e) => {
    e.preventDefault();
    const selectedTime = new Date(`1970-01-01T${exchangeRequest.time}:00`);
    const selectedHour = selectedTime.getHours();

    if (selectedHour < 7 || selectedHour > 14) {
      Swal.fire({
        title: 'Invalid Time',
        text: 'Please select a time between 7 AM and 2 PM.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const response = await fetch('/api/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          bookId: selectedBook._id,
          userBook: exchangeRequest.userBook,
          school: exchangeRequest.school,
          date: exchangeRequest.date,
          time: exchangeRequest.time,
        }),
      });

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Exchange request submitted successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        handleCloseModal();
      } else {
        const errorData = await response.json();
        console.error('Error submitting exchange request:', errorData.message);
        alert('Failed to submit exchange request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting exchange request:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-900">Available Books for Exchange</h1>

        <div className="mb-8 relative">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search books..."
              className="w-full p-3 pr-10 rounded-md bg-white text-black border border-[#a2e08ff3] focus:outline-none focus:ring-2 focus:ring-[#a2e08ff3]"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#a2e08ff3]" size={20} />
          </div>
          <div className="mt-2">
            <select
              value={filterCondition}
              onChange={(e) => setFilterCondition(e.target.value)}
              className="w-full p-3 rounded-md bg-white text-black border border-[#a2e08ff3] focus:outline-none focus:ring-2 focus:ring-[#a2e08ff3]"
            >
              <option value="all">All Conditions</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>
        </div>

        {currentBooks.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
              {currentBooks.map((book) => (
                <div key={book._id} className="w-full max-w-sm">
                  <div className="rounded-lg p-6 shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 h-full flex flex-col justify-between">
                    <div>
                      <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="w-full h-48 object-contain rounded-md mb-4"
                      />
                      <h3 className="text-xl font-semibold text-black mb-2">{book.title}</h3>
                      <p className="text-black opacity-80 mb-3">Owner: {book.author}</p>
                      <p className="text-black opacity-80 mb-3">Condition: {book.condition}</p>
                      <p className="text-black opacity-80 mb-3">Location: {book.location}</p>
                    </div>
                    <div className="mt-auto">
                      <button
                        onClick={() => handleExchange(book)}
                        className="w-full bg-[#a2e08ff3] text-white py-2 px-4 rounded hover:bg-[#588b49f3] transition duration-300"
                      >
                        Exchange
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-8 flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 mx-1 rounded-lg text-sm ${
                    currentPage === pageNumber
                      ? 'bg-[#a2e08ff3] text-white'
                      : 'bg-green-100 text-green-800'
                  } hover:bg-[#a2e08ff3] hover:text-white transition-colors`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-10 text-xl text-black">No books available at the moment.</div>
        )}
      </div>


      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#a2e08ff3]">Exchange Request</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleExchangeSubmit}>
              <div className="mb-4">
                <label className="block text-[#a2e08ff3] text-sm font-bold mb-2" htmlFor="userBook">Your Book Title</label>
                <input
                  type="text"
                  id="userBook"
                  value={exchangeRequest.userBook}
                  onChange={(e) => setExchangeRequest({ ...exchangeRequest, userBook: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a2e08ff3]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#a2e08ff3] text-sm font-bold mb-2" htmlFor="school">Select School</label>
                <select
                  id="school"
                  value={exchangeRequest.school}
                  onChange={(e) => setExchangeRequest({ ...exchangeRequest, school: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a2e08ff3]"
                  required
                >
                  <option value="">Select a school</option>
                  {schools.map((school) => (
                    <option key={school} value={school}>
                      {school}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-[#a2e08ff3] text-sm font-bold mb-2" htmlFor="date">Select Date</label>
                <input
                  type="date"
                  id="date"
                  value={exchangeRequest.date}
                  onChange={(e) => setExchangeRequest({ ...exchangeRequest, date: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a2e08ff3]"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-[#a2e08ff3] text-sm font-bold mb-2" htmlFor="time">Select Time</label>
                <input
                  type="time"
                  id="time"
                  value={exchangeRequest.time}
                  onChange={(e) => setExchangeRequest({ ...exchangeRequest, time: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a2e08ff3]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#a2e08ff3] text-white py-2 px-4 rounded hover:bg-[#588b49f3] transition duration-300"
              >
                Submit Exchange Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
