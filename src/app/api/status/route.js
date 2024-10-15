import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function GET(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ isLoggedIn: false }, { status: 200 });
  }

  try {
    verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ isLoggedIn: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ isLoggedIn: false }, { status: 200 });
  }
}

export async function OPTIONS(req) {
  return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
}
