const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const EmailLog = require('../models/EmailLog');
const auth = require('../middleware/auth'); 

// 1. Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
});

// 2. Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ SMTP Connection Error:", error.message);
  } else {
    console.log("✅ Mail Server is ready to send");
  }
});

// PROTECTED: Send Email
router.post('/send', async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    const info = await transporter.sendMail({
      from: `"MailFlow" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
               ${message}
             </div>`,
    });

    const newLog = new EmailLog({ recipient: to, subject, status: 'SENT' });
    await newLog.save();

    return res.status(200).json({ success: true, msg: "Email Sent Successfully!" });

  } catch (error) {
    console.error("Sending Error:", error.message);

    try {
      const failLog = new EmailLog({ 
        recipient: to, 
        subject, 
        status: 'FAILED', 
        errorMessage: error.message 
      });
      await failLog.save();
    } catch (dbErr) {
      console.error("DB Logging Error:", dbErr.message);
    }

    return res.status(500).json({ success: false, msg: error.message });
  }
});

// PROTECTED: Get Logs
router.get('/logs', auth, async (req, res) => {
  try {
    const logs = await EmailLog.find().sort({ sentAt: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PROTECTED: Delete Log
router.delete('/logs/:id', auth, async (req, res) => {
  try {
    const deletedLog = await EmailLog.findByIdAndDelete(req.params.id);
    if (!deletedLog) {
      return res.status(404).json({ success: false, msg: "Log not found" });
    }
    res.status(200).json({ success: true, msg: "Log deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

module.exports = router;