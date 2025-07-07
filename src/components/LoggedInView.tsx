// app/components/LoggedInView.tsx
import { logout } from '@/app/auth/actions'
import type { User } from '@supabase/supabase-js'
import IcebreakerDisplay from './IcebreakerDisplay'
import { createClient } from '../lib/supabaseClient';

// We need to pass the user object to this component
// to display the user's email.
export default async function LoggedInView({ user }: { user: User }) {
  // Create Supabase client
  const supabase = createClient();
  // Fetch the initial data on the server
  const { data: initialData, error } = await supabase.rpc('get_random_icebreaker');

  if (error || !initialData || initialData.length === 0) {
    // Handle the case where initial data fetching fails
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <p className="text-red-500">Could not load an icebreaker. Please try again later.</p>
      </main>
    );
  }

  // The RPC returns an array, so we grab the first item.
  const initialIcebreaker = initialData[0];
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
      <p className="mb-6">You are logged in as {user.email}</p>
      <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
          Random Icebreaker
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
          Break the ice with a random question!
          </p>
      </div>
      
      {/* We pass the server-fetched data as a prop to the client component */}
      <IcebreakerDisplay initialIcebreaker={initialIcebreaker} />
      <form action={logout}>
        <button
          type="submit"
          className="w-full p-2 bg-red-600 rounded text-white hover:bg-red-700"
        >
          Logout
        </button>
      </form>
    </div>
  )
}