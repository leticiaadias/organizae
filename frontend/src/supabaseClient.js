import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gdlpxbjjdqzrqztukekq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkbHB4YmpqZHF6cnF6dHVrZWtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NjMzNzAsImV4cCI6MjA4ODEzOTM3MH0._YCnFuZNqZ_gY2s_pNE40SoC92BUmFoXdcg6CQNLhXA";

export const supabase = createClient(supabaseUrl, supabaseKey);
