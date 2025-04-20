import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/db"; // optional: if you want extra DB info
import User from "@/models/User"; // assuming you use Mongoose for users

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return new Response(
      JSON.stringify({ error: "Unauthorized access" }),
      { status: 401 }
    );
  }

  try {
    await connectToDatabase(); // if fetching from DB

    // Optional: fetch more user details from DB
    const user = await User.findOne({ email: session.user.email }).select(
      "name email role image createdAt"
    );

    return new Response(JSON.stringify({ profile: user }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error fetching admin profile:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch profile" }),
      { status: 500 }
    );
  }
}
