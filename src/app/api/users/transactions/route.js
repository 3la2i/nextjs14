// File: app/api/users/transactions/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Transaction from '@/models/Transaction';
import { auth } from '@/middleware/auth';

async function handler(request) {
  try {
    await connectDB();
    
    const userId = request.user.userId;
    const transactions = await Transaction.find({ user: userId }).sort({ createdAt: -1 });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error fetching user transactions:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export const GET = auth(handler);