import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST() {
  try {
    const user = await currentUser();
    console.log("🔹 Clerk user:", user);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not signed in" },
        { status: 401 }
      );
    }

    const email = user.emailAddresses?.[0]?.emailAddress || null;
    const firstName = user.firstName || null;
    const lastName = user.lastName || null;

    const { data, error } = await supabase
      .from("users")
      .upsert(
        [
          {
            clerk_id: user.id,
            email,
            first_name: firstName,
            last_name: lastName,
          },
        ],
        { onConflict: "clerk_id" }
      )
      .select();

    console.log("🔹 Supabase result:", { data, error });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "✅ User synced to Supabase successfully!",
      user: data[0],
    });
  } catch (error: any) {
    console.error("❌ Sync error:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to sync user to Supabase",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
