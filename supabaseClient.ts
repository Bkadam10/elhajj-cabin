
import { createClient } from '@supabase/supabase-js';

// Credentials provided by the user
const supabaseUrl = 'https://pwturwmgzhcbhbwfdecl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dHVyd21nemhjYmhid2ZkZWNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzMjMyMTUsImV4cCI6MjA4MDg5OTIxNX0.CDjPcMhZVPY32lm5Ie6weCkf3G9Ah9XBW6dkRbG1gW0';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const isSupabaseConfigured = true;
