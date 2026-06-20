import { NextResponse } from 'next/server'

export async function POST(
  req: Request
) {
  try {
    const body = await req.json()

    const { phone } = body

    const response =
      await fetch(
        'https://control.msg91.com/api/v5/otp',
        {
          method: 'POST',

          headers: {
            accept:
              'application/json',

            'content-type':
              'application/json',

            authkey:
              process.env
                .MSG91_API_KEY || ''
          },

          body: JSON.stringify({
            mobile: `91${phone}`,
            template_id:
              process.env
                .MSG91_TEMPLATE_ID
          })
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
          'OTP send failed'
      },
      {
        status: 500
      }
    )
  }
}
