import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

// import * as dotenv from 'dotenv'
// dotenv.config()
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

// const supabaseUrl = "https://itzgmdgndusfvggjclwk.supabase.co"
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0emdtZGduZHVzZnZnZ2pjbHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA2NTgwNDYsImV4cCI6MTk4NjIzNDA0Nn0.pNt5W8ccp8TnrKhRaDzYPuVjKrcazjWh06QUMZ0ZC90"
// const supabase = createClient(supabaseUrl, supabaseKey)

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

export default supabase