import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    console.log("EMAIL ROUTE HIT");

    const { email, name } = await req.json();

    console.log("Recipient:", email);

    if (!process.env.EMAIL_APP_PASSWORD) {
      throw new Error("EMAIL_APP_PASSWORD is missing");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "contact@sol3.site",
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    console.log("Attempting send...");

    const info = await transporter.sendMail({
      from: '"Sol3" <contact@sol3.site>',
      to: email,
      subject: "🚀 You're on the Sol3 Early Access List",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px">
          <h1>Welcome to Sol3, ${name}</h1>

          <p>Your early access spot is officially secured.</p>

          <p>
            Thank you for joining the first wave of collectors and sellers.
          </p>

          <p>
            We'll notify you as soon as Sol3 opens access.
          </p>

          <br>

          <strong>Team Sol3</strong>
        </div>
      `,
    });

    console.log("EMAIL SENT SUCCESSFULLY");
    console.log("Message ID:", info.messageId);

    return Response.json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return Response.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}