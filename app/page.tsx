import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { SyncUserWithDB } from "./SyncuserwithDB"; // ✅ Add this line

export default async function Home() {
  const { userId } = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {/* ✅ Add this inside your main component */}
      <SyncUserWithDB />

      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold">PromptoShare</h1>
        <p className="text-xl text-gray-600">Share & Discover AI Prompts</p>

        <div className="flex gap-4 justify-center items-center">
          {userId ? (
            <>
              <p className="text-green-600 font-semibold">You're signed in!</p>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
