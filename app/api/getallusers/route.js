// app/api/getallusers/route.js
import { NextResponse } from 'next/server'
import connectDb from '@/db/connectDb'
import User from '@/models/User'

export const GET = async () => {
  await connectDb()
  const users = await User.find({}, 'username avatar bio') // Select only necessary fields
  return NextResponse.json({ success: true, users })
}
