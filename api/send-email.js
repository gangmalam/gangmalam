// File: api/send-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { nama, email, pesan } = req.body;

  if (!nama || !email || !pesan) {
    return res.status(400).json({ success: false, message: 'Semua kolom wajib diisi' });
  }

  try {
    // Replace with your own SMTP credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER, // e.g. khalifahpuri15@gmail.com
        pass: process.env.MAIL_PASS  // Gmail app password (not your account password!)
      }
    });

    await transporter.sendMail({
      from: `"${nama}" <${email}>`,
      to: 'khalifahpuri15@gmail.com',
      subject: 'Pesan dari Website',
      html: `<p><strong>Nama:</strong> ${nama}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Pesan:</strong><br>${pesan}</p>`
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Mail Error:', error);
    res.status(500).json({ success: false, message: 'Gagal mengirim email.' });
  }
}
