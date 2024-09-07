const {createClient}=require('@supabase/supabase-js')
require('dotenv').config();

const supabase=createClient(process.env.SUPABASE_URL,process.env.SUPABASE_API_KEY,{autoRefreshToken:true});
module.exports=supabase;