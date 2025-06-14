import { auth } from "@clerk/nextjs/server";

export default function BiddingPage() {
  const { userId } = auth();

  if (!userId) {
    return <p className="text-center p-10 text-red-500">You must be signed in to view this page.</p>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center text-white bg-black">
      <h1 className="text-3xl font-bold">Welcome to the Bidding Page!</h1>
    </main>
  );
}
