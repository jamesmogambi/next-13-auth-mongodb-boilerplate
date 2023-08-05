import { connectToDatabase } from "@/lib/db/mongo";
import { signJwtAccessToken } from "@/lib/jwt";
import User from "@/models/user";
import * as bcrypt from "bcrypt";

interface RequestBody {
  username: string;
  password: string;
}

//sign in user and generate token
export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  try {
    await connectToDatabase();
    const user = await User.findOne({ username: body.username });

    if (user && (await bcrypt.compare(body.password, user.password))) {
      const { password, ...userWithoutPass } = user;

      const accessToken = signJwtAccessToken(userWithoutPass);
      const { username, email, role, _id } = user;
      const result = {
        _id,
        username,
        email,
        role,
        accessToken,
      };

      return new Response(JSON.stringify(result));
    } else return new Response(JSON.stringify(null));
  } catch (err: any) {
    console.error(err.message);
    return new Response("Internal Server Error", { status: 500 });
  }
}
