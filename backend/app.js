const express=require('express');
const cors=require('cors');
const app=express();
const {createClient}=require('@supabase/supabase-js')
require('dotenv').config();

const supabase=createClient(process.env.SUPABASE_URL,process.env.SUPABASE_API_KEY)

app.use(cors())
app.use(express.json())



app.use(cors());

app.get('/',(req,res)=>{
    res.send("NoteSwap backend")
})


module.exports=app;