/**
 * Creates the main Supabase client used in the whole app.
 * We use this to transfer data to Supabase database (fetch, insert, update, etc).
 *
 * Note:
 * - This client is created once here.
 * - Other services import it and reuse the same instance.
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://tkmrboiugpiprlqzenzc.supabase.co',
  'sb_publishable_VrzKHicILbYNjbgJxppwPg_DRpt8iLy',
);
export { supabase };
