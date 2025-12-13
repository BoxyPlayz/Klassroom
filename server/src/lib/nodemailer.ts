import {type Transporter, createTransport} from "nodemailer";
import "dotenv/config"

const mailTransporter = createTransport({
  service: process.env["EMAIL_SERVICE"],
  auth: {
    user: process.env["EMAIL"],
    pass: process.env["EMAIL_PASSWORD"],
  },
});

export const sendMail = ({transporter = mailTransporter, subject, message, to}: {
  transporter?: Transporter;
  subject: string;
  message: string;
  to: string;
}) => {
  transporter.sendMail({
    to,
    subject,
    html: message,
  })
}

export default mailTransporter