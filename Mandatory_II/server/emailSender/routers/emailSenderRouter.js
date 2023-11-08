import { Router } from 'express';
const router = Router();

import nodemailer from 'nodemailer';

router.post('/sendContactEmail', async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: process.env.ETHEREAL_USER,
            pass: process.env.ETHEREAL_PASSWORD,
        },
    });


    const emailTemplate = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #333;">You've got a new message!</h2>
            <p><strong>From:</strong> ${req.body.name} (${req.body.email})</p>
            <p><strong>Subject:</strong> ${req.body.subject}</p>
            <div style="border-left: 3px solid #4CAF50; padding-left: 10px; margin-top: 10px;">
                <p><strong>Message:</strong></p>
                <p>${req.body.message}</p>
            </div>
        </div>
    `;

    try {
        let info = await transporter.sendMail({
            from: `"${req.body.name}" <${req.body.email}>`,
            to: 'contact@hostemaildomain.com',
            subject: `${req.body.subject}`,
            text: `${req.body.message}`,
            html: emailTemplate,
        });

        res.status(200).json({ success: true, message: 'Email sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error sending email' });
    }
});

export default router;
