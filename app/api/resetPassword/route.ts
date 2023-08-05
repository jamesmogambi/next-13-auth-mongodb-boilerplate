import { connectToDatabase } from "@/lib/db/mongo";
import { sendEmail } from "@/lib/sendMail";
import Token from "@/models/token";
import User from "@/models/user";
import * as bcrypt from "bcrypt";

interface RequestBody {
  email: string;
}

// generate password reset link
export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const { email } = body;

  try {
    await connectToDatabase();

    let user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify("User with given email doesn't exist"),
        {
          status: 400,
        }
      );
    }

    let token = await Token.findOne({ userId: user._id });

    if (!token) {
      token = await new Token({
        userId: user._id,
        token: await bcrypt.hash(user.email, 10),
      }).save();
    }

    const link = `${process.env.BASE_URL}/auth/reset-password/?userId=${user._id}&token=${token.token}`;
    const mailRes = await sendEmail(user.email, "Password reset", link);
    if (mailRes) {
      return new Response(
        JSON.stringify("password reset link sent to your email account"),
        {
          status: 200,
        }
      );
    }
  } catch (err: any) {
    console.error(err.message);
    return new Response("An error occured", { status: 500 });
  }
}
