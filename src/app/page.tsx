// app/page.tsx
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to Next.js + Supabase Auth</h1>
      <p className="text-lg mb-8">A simple application with separate routes for logged-in and logged-out users.</p>
      <div className="flex gap-4">
        <Link href="/login" className="px-6 py-2 bg-blue-600 rounded text-white hover:bg-blue-700">
          Go to Login
        </Link>
        <Link href="/dashboard" className="px-6 py-2 bg-green-600 rounded text-white hover:bg-green-700">
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}