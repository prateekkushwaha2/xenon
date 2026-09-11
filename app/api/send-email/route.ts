import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      type = 'status-update',
      to,
      customerName,
      trackingId,
      status,
      appointmentDate,
      appointmentTime,
    } = body

    if (!to || !customerName || !trackingId || !status) {
      return NextResponse.json(
        { error: 'Missing email details' },
        { status: 400 }
      )
    }

    const isConfirmation = type === 'confirmation'
    const subject = isConfirmation
      ? `L’ERA fit request received · ${trackingId}`
      : `L’ERA fit update · ${trackingId}`

    const heading = isConfirmation
      ? 'Your fit request is in.'
      : 'Your fit journey has moved forward.'

    const intro = isConfirmation
      ? `Hi ${customerName}, we’ve received your doorstep fit request. Our team will call you to confirm the visit.`
      : `Hi ${customerName}, there’s an update to your L’ERA fit request.`

    const html = `
      <div style="background:#f7f1e7;margin:0;padding:28px 16px;font-family:Arial,sans-serif;color:#211719;">
        <div style="max-width:620px;margin:auto;background:#fffaf3;border:1px solid #dfd1c0;border-radius:28px;overflow:hidden;">
          <div style="background:#211719;padding:28px 30px;color:#fff;">
            <div style="font-family:Georgia,serif;font-size:28px;letter-spacing:2px;">L’ERA</div>
            <div style="margin-top:8px;color:#d4b277;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Fit Lives Better.</div>
          </div>

          <div style="padding:32px 30px;">
            <div style="color:#a77a42;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;">${isConfirmation ? 'Request received' : 'Order update'}</div>
            <h1 style="font-family:Georgia,serif;font-size:38px;line-height:1.02;margin:0 0 18px;color:#211719;">${heading}</h1>
            <p style="font-size:15px;line-height:1.7;color:#665c57;margin:0;">${intro}</p>

            <div style="margin-top:28px;padding:22px;border-radius:20px;background:#211719;color:#fff;">
              <div style="color:#a9a09a;font-size:10px;letter-spacing:2px;text-transform:uppercase;">Tracking ID</div>
              <div style="margin-top:8px;font-family:Georgia,serif;font-size:28px;letter-spacing:2px;color:#d4b277;">${trackingId}</div>
              <div style="margin-top:20px;padding-top:18px;border-top:1px solid rgba(255,255,255,.1);color:#a9a09a;font-size:10px;letter-spacing:2px;text-transform:uppercase;">Current status</div>
              <div style="margin-top:8px;display:inline-block;padding:10px 16px;border-radius:999px;background:#d4af37;color:#211719;font-weight:bold;font-size:13px;">${status}</div>
            </div>

            ${appointmentDate || appointmentTime ? `
              <div style="margin-top:18px;padding:18px 20px;border:1px solid #dfd1c0;border-radius:18px;background:#f5ede2;">
                <div style="color:#8d7d70;font-size:10px;letter-spacing:2px;text-transform:uppercase;">Requested visit</div>
                <div style="margin-top:7px;font-size:15px;color:#211719;">${appointmentDate || 'Date to be confirmed'} · ${appointmentTime || 'Time to be confirmed'}</div>
              </div>
            ` : ''}

            <div style="margin-top:28px;text-align:center;">
              <a href="${siteUrl}/track" style="display:inline-block;padding:14px 24px;border-radius:999px;background:#211719;color:#fff;text-decoration:none;font-weight:bold;font-size:13px;">Track your request</a>
            </div>

            <p style="margin-top:30px;color:#8d837d;font-size:12px;line-height:1.7;text-align:center;">
              Keep your tracking ID safe. If you did not request this, please contact L’ERA.
            </p>
          </div>
        </div>
      </div>
    `

    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        'L’ERA <onboarding@resend.dev>',
      to,
      subject,
      html,
    })

    if (error) {
      console.error(error)
      return NextResponse.json(
        { error: 'Email send failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Email send failed' },
      { status: 500 }
    )
  }
}
