
// app/api/profile/route.js
import { auth } from '@/middleware/auth';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export const GET = auth(async (req) => {
  try {
    const userId = req.user.userId; // Assuming the middleware adds the user ID to the request
    console.log("id",userId);
    
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user profile' }, { status: 500 });
  }
});





export const PUT = auth(async (req) => {
    try {
      const userId = req.user.userId;
      const updatedData = await req.json();
  
      const user = await User.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true }).select('-password');
  
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      return NextResponse.json(user);
    } catch (error) {
      console.error('Error updating user profile:', error);
      return NextResponse.json({ error: 'Failed to update user profile' }, { status: 500 });
    }
  });
  




