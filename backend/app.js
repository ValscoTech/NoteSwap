import express, { json, urlencoded } from 'express';
import cors from 'cors';
import  authenticateUser  from './utils/middleware.js';
import notesRouter from './controllers/notes.js';
import profileRouter from './controllers/userprofile.js';
import authRouter from './controllers/customAuth.js';


const app=express();

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



export default app;