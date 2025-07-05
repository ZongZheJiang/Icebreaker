// components/IcebreakerDisplay.tsx
"use client"; // This is a client component

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

// Define the type for our icebreaker object
type Icebreaker = {
  id: number;
  question: string;
  category: string;
};

// The component receives the initial icebreaker as a prop
export default function IcebreakerDisplay({ initialIcebreaker }: { initialIcebreaker: Icebreaker }) {
  const [isLoading, setIsLoading] = useState(false);
  const [icebreaker, setIcebreaker] = useState<Icebreaker>(initialIcebreaker);

  const getNewIcebreaker = async () => {
    setIsLoading(true);

    // Call our database function
    const { data, error } = await supabase.rpc('get_random_icebreaker');

    if (error) {
      console.error('Error fetching new icebreaker:', error);
      // Handle the error appropriately in a real app
    } else if (data && data.length > 0) {
      // The function returns an array, so we take the first element
      setIcebreaker(data[0]);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center">
      <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-600 bg-purple-200 rounded-full mb-4">
        {icebreaker.category}
      </span>
      <p className="text-2xl font-medium text-gray-900 dark:text-white mb-6 min-h-[100px]">
        {`"${icebreaker.question}"`}
      </p>
      <button
        onClick={getNewIcebreaker}
        disabled={isLoading}
        className="w-full px-4 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400"
      >
        {isLoading ? 'Loading...' : 'Get New Icebreaker'}
      </button>
    </div>
  );
}