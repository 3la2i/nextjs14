// File: src/app/api/books/user/route.js
import { NextResponse } from 'next/server';
import Book from '@/models/books';
import { connectDB } from '../../../../lib/db';

export async function GET(request) {
  await connectDB();
  
  // Get the user ID from the request query
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  try {
    const books = await Book.find({ owner: userId });
    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching user books:', error);
    return NextResponse.json({ message: 'Error fetching user books', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
    await connectDB();
    const bookId = params.bookId;
  
    try {
      const deletedBook = await Book.findByIdAndDelete(bookId);
      if (!deletedBook) {
        return NextResponse.json({ message: 'Book not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error('Error deleting book:', error);
      return NextResponse.json({ message: 'Error deleting book', error: error.message }, { status: 500 });
    }
  }