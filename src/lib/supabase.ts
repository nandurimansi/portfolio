import { createClient } from '@supabase/supabase-js';

const url =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://mimwannnvumvsrjffouk.supabase.co';
const anonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pbXdhbm5udnVtdnNyamZmb3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzMjI2MjUsImV4cCI6MjEwNzg5ODYyNX0.SBVCfy2txP92XZHA9K3lGdG53oJ7xjoIy5BiB5N9D9M';

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false },
});

