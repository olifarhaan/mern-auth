import nodemailer from "nodemailer"
import dotenv from "dotenv/config"

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
})

export const sendMail = async (toAddress, subject, htmlBody) => {
  const mailOptions = {
    from: {
      name: "Quick Quip",
      address: "olifarhaan@gmail.com",
    }, // sender address
    to: toAddress, // list of receivers
    subject: subject, // Subject line
    // text: textBody, // plain text body
    html: htmlBody, // html body
  }
  try {
    transporter.sendMail(mailOptions)
    console.log("Email sent successfully")
  } catch (error) {
    console.log(error)
  }
}
