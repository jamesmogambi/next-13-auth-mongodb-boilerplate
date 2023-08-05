import nodemailer from "nodemailer";

export const sendEmail = async (
  email: string,
  subject: string,
  text: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      //   host: process.env.HOST,
      service: process.env.EMAIL_SERVICE,
      //   port: 587,
      //   secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        // pass: "mugambi98$",
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("email sent sucessfully");
    return true;
  } catch (error) {
    console.log(error, "email not sent");
  }
};
