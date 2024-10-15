// File: src/app/api/books/[bookId]/route.js
import { NextResponse } from 'next/server';
import Book from '../../../../models/books';
import { connectDB } from '../../../../lib/db';

export async function GET(request, { params }) {
  await connectDB();
  const bookId = params.bookId;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json({ message: 'Error fetching book', error: error.message }, { status: 500 });
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