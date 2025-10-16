import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-3xl font-bold">CFB Top-25 Ranker</h1>
        <p>Pick between two teams until your personal Top-25 is set.</p>
        <Link
          href="/quiz/test-session"
          className="inline-block rounded bg-black text-white px-4 py-2"
        >
          Build my Top-25
        </Link>
      </div>
    </main>
  );
}

