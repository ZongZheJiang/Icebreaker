// app/components/AuthManager.tsx
import { createClient } from '../utils/supabaseClient'
import AuthForm from './AuthForm'
import LoggedInView from './LoggedInView'

export default async function AuthManager() {
  // Create Supabase client   
  const supabase = createClient()
  
  // Fetch the user session
  const { data: { user } } = await supabase.auth.getUser()

  // Conditionally render the correct component
  if (user) {
    // If user is logged in, show the welcome view
    return <LoggedInView user={user} />
  } else {
    // If user is not logged in, show the login/signup form
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Login or Sign Up</h2>
        <AuthForm />
      </div>
    )
  }
}