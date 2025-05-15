import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wqvkzsfkmjtxyuemrwsu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxdmt6c2ZrbWp0eHl1ZW1yd3N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNDg3MjIsImV4cCI6MjA2MjgyNDcyMn0.S82xqZfXay6ZJsU1JjIjNu0qgbDTA6SJBOCMUcIGnJg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
