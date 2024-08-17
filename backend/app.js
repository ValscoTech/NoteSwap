const express=require('express');
const cors=require('cors');
const app=express();
const notesRouter=require('./controllers/notes');
const profileRouter=require('./controllers/userprofile');
const supabase=require('./supabaseclient');

app.use(cors())
app.use(express.json())



app.use(cors());




app.use('/api/notes',notesRouter);
app.use('/api/profile',profileRouter);  



module.exports={app};