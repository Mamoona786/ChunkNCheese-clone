// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rvocrhkyaxjfydquvvnr.supabase.co'; // Replace with your Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2b2NyaGt5YXhqZnlkcXV2dm5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MDUyODAsImV4cCI6MjA0NjQ4MTI4MH0.kTzoVZ4WtFuUur_AiJ_AO67lAGug921uK-_t71yePvc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
