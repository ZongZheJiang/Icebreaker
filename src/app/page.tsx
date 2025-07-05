// app/page.tsx
import { supabase } from '../../lib/supabaseClient';
import IcebreakerDisplay from '../../components/IcebreakerDisplay';

// Force this page to be dynamically rendered
export const revalidate = 0;

export default async function HomePage() {
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
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
    </main>
  );
}