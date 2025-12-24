import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const { name, email, subject, message } = await request.json();

        // Validate input
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Create a transporter using Gmail
        // Note: You'll need to set up App Password in your Gmail account
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || 'devindaishan98@gmail.com',
                pass: process.env.EMAIL_PASSWORD, // You need to set this in .env.local
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER || 'devindaishan98@gmail.com',
            to: 'devindaishan98@gmail.com',
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #6366f1;">New Contact Form Submission</h2>
                    <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                    </div>
                    <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                        <h3 style="color: #374151; margin-top: 0;">Message:</h3>
                        <p style="color: #4b5563; line-height: 1.6;">${message}</p>
                    </div>
                    <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
                        <p style="margin: 0; color: #92400e;">
                            <strong>Reply to:</strong> <a href="mailto:${email}" style="color: #6366f1;">${email}</a>
                        </p>
                    </div>
                </div>
            `,
            replyTo: email,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Email sent successfully!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email. Please try again later.' },
            { status: 500 }
        );
    }
}
