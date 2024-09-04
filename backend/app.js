const express=require('express');
const cors=require('cors');
const app=express();
const authenticateUser=require('./utils/middleware').authenticateUser;
const notesRouter=require('./controllers/notes');
const profileRouter=require('./controllers/userprofile');
const authRouter=require('./controllers/customAuth');
// const {supabase}=require('./supabaseclient');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/auth',authRouter);    
app.use('/api/notes',authenticateUser,notesRouter); 
app.use('/api/profile',authenticateUser,profileRouter); 


app.use((req, res, next) => {
    res.status(404).json({
        message: 'Route not found',
    });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal Server Error',
    });
});



module.exports={app};