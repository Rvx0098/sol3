import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "contact@sol3.site",
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"Sol3" <contact@sol3.site>',
      to: email,
      subject: "🚀 You're on the Sol3 Early Access List",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
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

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false },
      { status: 500 }
    );
  }
}