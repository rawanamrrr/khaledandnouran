import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/gmail';

export async function POST(req: NextRequest) {
  try {
    const { attendance, name, guestCount, guestNames } = await req.json();

    if (!name) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }

    const subject = `New RSVP from ${name}`;
        const isAttending = attendance === 'attending';
    const attendanceText = isAttending ? 'Attending' : 'Not Attending';
    const attendanceColor = isAttending ? '#22c55e' : '#ef4444';

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New RSVP Submission</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #f9f8fa;
          margin: 0;
          padding: 20px;
          color: #3a393b;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fcfbfe;
          border: 1px solid #e5e2e7;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .header {
          background-color: #9c9ba5;
          color: #fcfbfe;
          padding: 24px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 32px;
        }
        .content h2 {
          font-size: 20px;
          font-weight: 600;
          color: #3a393b;
          margin-top: 0;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 12px;
          font-size: 16px;
        }
        .info-grid strong {
          color: #5f5d64;
        }
        .status {
          font-weight: bold;
          padding: 4px 8px;
          border-radius: 6px;
          color: white;
          display: inline-block;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #9c9ba5;
          padding: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New RSVP Received</h1>
        </div>
        <div class="content">
          <h2>A new response has been submitted for your wedding.</h2>
          <div class="info-grid">
            <strong>Name:</strong>
            <span>${name}</span>
            
            <strong>Attendance:</strong>
            <span><span class="status" style="background-color: ${attendanceColor};">${attendanceText}</span></span>
            
            ${isAttending ? `
            <strong>Guests:</strong>
            <span>${guestCount}</span>
            
            <strong>Guest Names:</strong>
            <span>${guestNames || 'N/A'}</span>
            ` : ''}
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from your wedding website.</p>
        </div>
      </div>
    </body>
    </html>
    `;

    await sendEmail(process.env.CONTACT_EMAIL!, subject, html);

    return NextResponse.json({ message: 'RSVP submitted successfully' });
  } catch (error) {
    console.error('Error processing RSVP:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
