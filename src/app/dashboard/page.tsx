// app/dashboard/page.tsx
import { createClient } from '../../lib/supabaseServer'
import { logout } from '@/app/auth/actions'
import { redirect } from 'next/navigation'
import LoggedInView from '../../components/LoggedInView'

export default async function DashboardPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Although middleware protects this route, it's good practice
  // to double-check on the server component level.
  if (!user) {
    return redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
        <LoggedInView user={user} />
      </div>

      {/* <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard!</h2>
        <p className="mb-6">You are logged in as: {user.email}</p>
        <form action={logout}>
          <button
            type="submit"
            className="w-full p-2 bg-red-600 rounded text-white hover:bg-red-700"
          >
            Logout
          </button>
        </form>
      </div> */}
    </div>
  )
}