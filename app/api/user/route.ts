import { connectToDatabase } from "@/lib/db/mongo";
import User from "@/models/user";
import * as bcrypt from "bcrypt";

interface RequestBody {
  username: string;
  email: string;
  password: string;
}

//register new user
export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const { email, username } = body;

  try {
    await connectToDatabase();
    let user = await User.findOne({ email });
    if (user) {
      return new Response("User already exists", { status: 500 });
    }

    user = new User({
      username,
      email,
      password: body.password,
    });

    user.password = await bcrypt.hash(body.password, 10);

    await user.save();
    user.password = undefined;

    return new Response(JSON.stringify(user));
  } catch (err: any) {
    console.error(err.message);
    return new Response("Internal Server Error", { status: 500 });
  }
}
