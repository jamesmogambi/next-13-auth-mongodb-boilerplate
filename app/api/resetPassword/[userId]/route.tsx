import { connectToDatabase } from "@/lib/db/mongo";
import Token from "@/models/token";
import User from "@/models/user";
import * as bcrypt from "bcrypt";

interface RequestBody {
  password: string;
}

// reset password of user
export async function PATCH(request: Request, { params }: any) {
  const body: RequestBody = await request.json();
  const { searchParams } = new URL(request.url);
  const passwordResetToken = searchParams.get("token");
  try {
    await connectToDatabase();
    const user = await User.findById(params.userId);
    if (!user) {
      return new Response("Invalid user", {
        status: 400,
      });
    }

    const token = await Token.findOne({
      userId: user._id,
      token: passwordResetToken,
    });
    if (!token) {
      return new Response("Invalid link or expired", {
        status: 400,
      });
    }
    user.password = await bcrypt.hash(body.password, 10);
    await user.save();
    await Token.deleteOne({ token: passwordResetToken });

    return new Response(JSON.stringify("Password reset successfully"));
  } catch (err: any) {
    console.error(err.message);
    return new Response("An error occured", { status: 500 });
  }
}
