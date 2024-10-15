import { NextResponse } from 'next/server';
import Book from '../../../models/books';
import { connectDB } from '../../../lib/db';
import jwt from 'jsonwebtoken';

// Helper function to get user ID from the token
const getUserIdFromToken = (request) => {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return null;
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded.userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  
  export async function POST(request) {
    await connectDB();
  
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    try {
      const { title, author, condition, location, imageUrl, contactInfo } = await request.json();
  
      const newBook = new Book({
        title,
        author,
        condition,
        location,
        imageUrl,
        owner: userId,
        contactInfo,
        status: 'available',
      });
  
      await newBook.save();
      return NextResponse.json({ message: 'Book added successfully', book: newBook }, { status: 201 });
    } catch (error) {
      console.error('Error adding book:', error);
      return NextResponse.json({ message: 'Error adding book', error: error.message }, { status: 500 });
    }
  }

  
export async function GET(request) {
  await connectDB();

  const userId = getUserIdFromToken(request);
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const books = await Book.find();
    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ message: 'Error fetching books', error: error.message }, { status: 500 });
  }
}




