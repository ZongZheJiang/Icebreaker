// app/auth/actions.ts
'use server'

import { createClient } from '../../lib/supabaseServer'
import { redirect } from 'next/navigation'

export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect('/')
}