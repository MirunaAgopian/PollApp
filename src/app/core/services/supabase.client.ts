import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://tkmrboiugpiprlqzenzc.supabase.co', 'sb_publishable_VrzKHicILbYNjbgJxppwPg_DRpt8iLy');

export { supabase };