import Razorpay from 'razorpay'
import { NextResponse } from 'next/server'

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const options = {
      amount: body.amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json(order)
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
{/* This website is mde by prateek kushwaha github : @prateekkushwaha2*/}
