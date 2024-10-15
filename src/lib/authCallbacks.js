import User from "@/models/User";
import {connectDB} from "@/lib/db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers"; 
export const authCallbacks = {
  async signIn({ user, account }) {
    await connectDB();

    let dbUser = await User.findOne({ email: user.email });

    if (!dbUser) {
      dbUser = new User({
        name: user.name,
        email: user.email,
        googleId: account.providerAccountId,
      });
      await dbUser.save();
    }

    const payloadJwt = {
        userId: dbUser._id.toString(),
    };

    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(payloadJwt, secretKey, { expiresIn: "2h" });

    const cookieStore = cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 2 * 60 * 60, 
      path: "/", 
    });

    return NextResponse.json(
      { success: true, message: "Authentication successful" },
      { status: 200 }
    );
  },
};