import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  'https://dgonkbsonymvqpykxlku.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_KEY
)
