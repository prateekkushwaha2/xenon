import { NextResponse } from 'next/server'

export async function POST(
  req: Request
) {
  try {
    const body = await req.json()

    const {
      phone,
      otp
    } = body

    const response =
      await fetch(
        `https://control.msg91.com/api/v5/otp/verify?mobile=91${phone}&otp=${otp}`,
        {
          method: 'GET',

          headers: {
            authkey:
              process.env
                .MSG91_API_KEY || ''
          }
        }
      )

    const data =
      await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error:
          'OTP verification failed'
      },
      {
        status: 500
      }
    )
  }
}
