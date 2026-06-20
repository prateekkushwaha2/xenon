import { NextResponse } from 'next/server'

import { Resend } from 'resend'

const resend = new Resend(
  process.env.RESEND_API_KEY
)

export async function POST(
  req: Request
) {
  try {
    const body = await req.json()

    const {
      to,
      customerName,
      trackingId,
      total,
      products,
      address,
      city,
      pincode
    } = body

    const productHtml =
      products
        .map(
          (item: any) => `
            <div style="
              display:flex;
              align-items:center;
              gap:20px;
              padding:20px;
              border:1px solid rgba(255,255,255,0.08);
              border-radius:24px;
              margin-bottom:20px;
              background:#111;
            ">
              <img
                src="${item.image}"
                width="90"
                height="90"
                style="
                  border-radius:18px;
                  object-fit:cover;
                "
              />

              <div>
                <h3 style="
                  color:white;
                  font-size:20px;
                  margin:0 0 10px 0;
                ">
                  ${item.name}
                </h3>

                <p style="
                  color:#999;
                  margin:0;
                ">
                  Qty: ${item.quantity}
                </p>

                <p style="
                  color:#d4af37;
                  font-size:18px;
                  margin-top:10px;
                ">
                  ₹${item.price}
                </p>
              </div>
            </div>
          `
        )
        .join('')

    const data =
      await resend.emails.send({
        from:
          'XENON <onboarding@resend.dev>',

        to,

        subject:
          'Your XENON Order Has Been Confirmed',

        html: `
        <div style="
        background:#000;
        margin:0;
        padding:20px;
        font-family:Arial,sans-serif;
        color:white;
        ">
        <div style="
            max-width:600px;
            margin:auto;
            background:#050505;
            border:1px solid rgba(255,255,255,0.08);
            border-radius:28px;
            overflow:hidden;
        ">

            <!-- Hero -->
            <img
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop"
            style="
                width:100%;
                height:220px;
                object-fit:cover;
                display:block;
            "
            />

            <!-- Content -->
            <div style="padding:28px;">

            <!-- Brand -->
            <p style="
                color:#d4af37;
                letter-spacing:4px;
                text-transform:uppercase;
                font-size:11px;
                margin:0 0 16px 0;
            ">
                XENON LUXURY
            </p>

            <!-- Heading -->
            <h1 style="
                font-size:34px;
                line-height:1.2;
                margin:0 0 20px 0;
                color:white;
            ">
                Order Confirmed
            </h1>

            <!-- Intro -->
            <p style="
                color:#b0b0b0;
                font-size:16px;
                line-height:1.8;
                margin:0;
            ">
                Hello ${customerName},
                your luxury order has been confirmed successfully.
            </p>

            <!-- Tracking -->
            <div style="
                margin-top:30px;
                padding:24px;
                border-radius:24px;
                background:#111;
                border:1px solid rgba(212,175,55,0.18);
            ">
                <p style="
                color:#888;
                margin:0 0 10px 0;
                text-transform:uppercase;
                letter-spacing:3px;
                font-size:11px;
                ">
                Tracking ID
                </p>

                <h2 style="
                color:#d4af37;
                font-size:28px;
                margin:0;
                line-height:1.4;
                word-break:break-word;
                ">
                ${trackingId}
                </h2>
            </div>

            <!-- Products -->
            <div style="margin-top:35px;">
                <h2 style="
                font-size:24px;
                margin-bottom:20px;
                color:white;
                ">
                Order Summary
                </h2>

                ${productHtml}
            </div>

            <!-- Total -->
            <div style="
                margin-top:35px;
                padding:24px;
                border-radius:24px;
                background:#111;
            ">
                <p style="
                color:#888;
                margin:0 0 12px 0;
                text-transform:uppercase;
                letter-spacing:3px;
                font-size:11px;
                ">
                Total Amount
                </p>

                <h2 style="
                color:#d4af37;
                font-size:34px;
                margin:0;
                ">
                ₹${total}
                </h2>
            </div>

            <!-- Address -->
            <div style="
                margin-top:35px;
                padding:24px;
                border-radius:24px;
                background:#111;
            ">
                <p style="
                color:#888;
                margin:0 0 14px 0;
                text-transform:uppercase;
                letter-spacing:3px;
                font-size:11px;
                ">
                Delivery Address
                </p>

                <p style="
                color:#ddd;
                font-size:15px;
                line-height:1.8;
                margin:0;
                ">
                ${address}<br/>
                ${city} - ${pincode}
                </p>
            </div>

            <!-- Button -->
            <div style="
                margin-top:40px;
                text-align:center;
            ">
                <a
                href="https://yourdomain.com/track"
                style="
                    display:inline-block;
                    padding:16px 30px;
                    background:#d4af37;
                    color:black;
                    text-decoration:none;
                    border-radius:999px;
                    font-weight:bold;
                    font-size:15px;
                "
                >
                Track Your Order
                </a>
            </div>

            <!-- Footer -->
            <p style="
                margin-top:45px;
                color:#666;
                font-size:13px;
                text-align:center;
                line-height:1.8;
            ">
                Thank you for choosing XENON.<br/>
                Luxury crafted for timeless elegance.
            </p>

            </div>
        </div>
        </div>
        `
      })

    return NextResponse.json(data)
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error:
          'Failed to send confirmation email'
      },
      {
        status: 500
      }
    )
  }
}