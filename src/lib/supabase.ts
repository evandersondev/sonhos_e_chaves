import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  'https://dotlxibjbjydutyvfurz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvdGx4aWJqYmp5ZHV0eXZmdXJ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTc2OTEzMywiZXhwIjoyMDM3MzQ1MTMzfQ.zD_LoVibJyI2jcef3cQdbFJaHOLyMUv4tZ2qxSDtmKM',
)
