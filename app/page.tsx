import { redirect } from 'next/navigation'

export default function HomePage() {
  redirect('/landing')
}
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-white">

      {/* Sənin mövcud content-in varsa burda qalır */}
      <h1 className="text-5xl font-bold mb-4">
        ⚡ AI Skill Platform
      </h1>

      <p className="text-gray-400 mb-10 text-center max-w-md">
        Welcome to the platform. Explore tools and AI features.
      </p>

      {/* 🔥 AI BUTTON */}
      <Link href="/ai">
        <button className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition">
          Open AI Chat 🚀
        </button>
      </Link>

    </div>
  );
}