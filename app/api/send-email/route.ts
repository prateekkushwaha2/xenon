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
      subject,
      customerName,
      orderId,
      status
    } = body

    const data =
      await resend.emails.send({
        from:
          'XENON <onboarding@resend.dev>',

        to,

        subject,

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
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop"
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
              Order Status Updated
            </h1>

            <!-- Intro -->
            <p style="
              color:#b0b0b0;
              font-size:16px;
              line-height:1.8;
              margin:0;
            ">
              Hello ${customerName},
              your XENON luxury order status has been updated successfully.
            </p>

            <!-- Order Card -->
            <div style="
              margin-top:30px;
              padding:24px;
              border-radius:24px;
              background:#111;
              border:1px solid rgba(212,175,55,0.18);
            ">

              <!-- Order ID -->
              <p style="
                color:#888;
                margin:0 0 10px 0;
                text-transform:uppercase;
                letter-spacing:3px;
                font-size:11px;
              ">
                Order ID
              </p>

              <h2 style="
                color:#d4af37;
                font-size:30px;
                margin:0;
                line-height:1.4;
              ">
                #${orderId}
              </h2>

              <!-- Status -->
              <div style="
                margin-top:28px;
                padding-top:24px;
                border-top:1px solid rgba(255,255,255,0.08);
              ">
                <p style="
                  color:#888;
                  margin:0 0 10px 0;
                  text-transform:uppercase;
                  letter-spacing:3px;
                  font-size:11px;
                ">
                  Current Status
                </p>

                <div style="
                  display:inline-block;
                  padding:14px 22px;
                  border-radius:999px;
                  background:#d4af37;
                  color:black;
                  font-weight:bold;
                  font-size:15px;
                ">
                  ${status}
                </div>
              </div>
            </div>

            <!-- Timeline -->
            <div style="
              margin-top:35px;
              padding:24px;
              border-radius:24px;
              background:#111;
            ">
              <p style="
                color:#888;
                margin:0 0 18px 0;
                text-transform:uppercase;
                letter-spacing:3px;
                font-size:11px;
              ">
                Order Journey
              </p>

              <div style="
                display:flex;
                justify-content:space-between;
                gap:10px;
                flex-wrap:wrap;
              ">

                <div style="
                  flex:1;
                  min-width:110px;
                  text-align:center;
                ">
                  <div style="
                    width:38px;
                    height:38px;
                    border-radius:999px;
                    background:#d4af37;
                    color:black;
                    font-weight:bold;
                    line-height:38px;
                    margin:auto;
                  ">
                    ✓
                  </div>

                  <p style="
                    color:white;
                    font-size:13px;
                    margin-top:10px;
                  ">
                    Pending
                  </p>
                </div>

                <div style="
                  flex:1;
                  min-width:110px;
                  text-align:center;
                ">
                  <div style="
                    width:38px;
                    height:38px;
                    border-radius:999px;
                    background:${
                      status === 'Packed' ||
                      status === 'Shipped' ||
                      status === 'Delivered'
                        ? '#d4af37'
                        : '#222'
                    };
                    color:${
                      status === 'Packed' ||
                      status === 'Shipped' ||
                      status === 'Delivered'
                        ? 'black'
                        : '#666'
                    };
                    font-weight:bold;
                    line-height:38px;
                    margin:auto;
                  ">
                    ${
                      status === 'Packed' ||
                      status === 'Shipped' ||
                      status === 'Delivered'
                        ? '✓'
                        : '2'
                    }
                  </div>

                  <p style="
                    color:white;
                    font-size:13px;
                    margin-top:10px;
                  ">
                    Packed
                  </p>
                </div>

                <div style="
                  flex:1;
                  min-width:110px;
                  text-align:center;
                ">
                  <div style="
                    width:38px;
                    height:38px;
                    border-radius:999px;
                    background:${
                      status === 'Shipped' ||
                      status === 'Delivered'
                        ? '#d4af37'
                        : '#222'
                    };
                    color:${
                      status === 'Shipped' ||
                      status === 'Delivered'
                        ? 'black'
                        : '#666'
                    };
                    font-weight:bold;
                    line-height:38px;
                    margin:auto;
                  ">
                    ${
                      status === 'Shipped' ||
                      status === 'Delivered'
                        ? '✓'
                        : '3'
                    }
                  </div>

                  <p style="
                    color:white;
                    font-size:13px;
                    margin-top:10px;
                  ">
                    Shipped
                  </p>
                </div>

                <div style="
                  flex:1;
                  min-width:110px;
                  text-align:center;
                ">
                  <div style="
                    width:38px;
                    height:38px;
                    border-radius:999px;
                    background:${
                      status === 'Delivered'
                        ? '#d4af37'
                        : '#222'
                    };
                    color:${
                      status === 'Delivered'
                        ? 'black'
                        : '#666'
                    };
                    font-weight:bold;
                    line-height:38px;
                    margin:auto;
                  ">
                    ${
                      status === 'Delivered'
                        ? '✓'
                        : '4'
                    }
                  </div>

                  <p style="
                    color:white;
                    font-size:13px;
                    margin-top:10px;
                  ">
                    Delivered
                  </p>
                </div>

              </div>
            </div>

            <!-- CTA -->
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
          'Email send failed'
      },
      {
        status: 500
      }
    )
  }
}