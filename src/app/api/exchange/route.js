import { NextResponse } from 'next/server';
import Book from '../../../models/books';
import { connectDB } from '../../../lib/db';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

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

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
  });
};

export async function POST(request) {
    await connectDB();
  
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    try {
      const { bookId, userBook, school, date, time } = await request.json();
  
      const book = await Book.findById(bookId);
      if (!book) {
        return NextResponse.json({ message: 'Book not found' }, { status: 404 });
      }
  
      // Ensure exchangeRequests is initialized as an array
      if (!book.exchangeRequests) {
        book.exchangeRequests = [];
      }
  
      // Push the new exchange request into exchangeRequests array
      book.exchangeRequests.push({
        requestor: userId,
        userBook,
        school,
        date,
        time,
      });
  
      await book.save();
  
      // Check if ownerEmail exists
      if (!book.contactInfo.email) {
        console.error('Owner email is not defined.');
        return NextResponse.json({ message: 'Owner email is missing' }, { status: 500 });
      }
  
      // Log the owner email to verify it's retrieved correctly
      console.log('Owner email:', book.contactInfo.email);
  
      // Send email to book owner
      const emailSubject = 'New Exchange Request';
      const emailText = `
        Hello,
  
        You have received a new exchange request for your book "${book.title}".
  
        Request details:
        - Requestor's Book: ${userBook}
        - School: ${school}
        - Date: ${date}
        - Time: ${time}
  
        Please log in to your account to review and respond to this request.
  
        Thank you for using our book exchange platform!
      `;
  
      await sendEmail(book.contactInfo.email, emailSubject, emailText);
  
      return NextResponse.json({ message: 'Exchange request submitted successfully and owner notified' }, { status: 200 });
    } catch (error) {
      console.error('Error submitting exchange request:', error);
      return NextResponse.json({ message: 'Error submitting exchange request', error: error.message }, { status: 500 });
    }
  }