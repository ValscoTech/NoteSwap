import express from 'express';
const authRouter=express.Router();
import supabase from '../database/supabaseClient.js';
import supabaseAdmin from '../database/supabaseAdmin.js';
import authenticateUser  from '../utils/middleware.js';


authRouter.post('/signup',async(req,res)=>{

    const {email,username,password}=req.body
    try{
        const {data,error}=await supabase.auth.signUp({email,password,
            options:{
                data:{username},
                emailRedirectTo:null,
                emailConfirmation:false
            }
        })
        if(error){
            throw error
        }

        res.status(201).json({message:"Successful signup",data})

    }
    catch(err){
        res.status(404).json({error:err.message})
    }

})

authRouter.post('/login',async(req,res)=>{
    const {email,username,password}=req.body

    try{
        const {data,error}=await supabase.auth.signInWithPassword({email,password})
        if(error){
            throw error
        }

        res.status(200).json({
            message: "Successful login",
            session: {
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token,
                expires_at: data.session.expires_at
            }
        });
    }
    catch(err){
        res.status(404).json({error:err.message})
    }    
})

authRouter.post('/logout',async(req,res)=>{
    try{
        const {error}=await supabase.auth.admin.signOut(token);
        if(error){
            throw error
        }
        res.status(200).json({message:"Successful logout"})  
    }
    catch(err){
        res.status(404).json({error:err.message})
    }
})

authRouter.post('/refresh',async(req,res)=>{
    
    

    try{
        const { data,error }=await supabase.auth.refreshSession()
        if(error){
            throw error
        }
        res.status(200).json({
            message: "Token refreshed successfully",
            session: {
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token,
                expires_at: data.session.expires_at
            }
        })
    }
    catch(err){
        res.status(401).json({error:'Invalid/expired refresh token'})
    }
})


authRouter.post('/updatePassword',authenticateUser,async(req,res)=>{
    const {new_password}=req.body
    if(!new_password){
        return res.status(400).json({error:"Password cannot be empty"})
    }

    try{
        const {data,error}=await supabase.auth.updateUser({password:new_password})
        if(error){
            throw error
        }
        res.status(200).json({message:"Password updated successfully"})
    }
    catch(err){
        res.status(404).json({error:err.message})
    }
})

authRouter.post('/reset-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'url-to-redirect-to-after-user-clicks-email'
        });

        if (error) {
            throw error;
        }

        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

authRouter.delete('/deleteUser',authenticateUser,async(req,res)=>{
    const id=req.user.id
    try{

        const {data:notes,error:notesError}=await supabase.from('CourseNotes').select('*').eq('posted_by',id)
        if(notesError){
            throw notesError
        }

        const filepaths=[]
        const imagePaths=[]

        notes.forEach(note=>{
            const pdfFilePath=note.fileUrl.split('/').pop()
            const imageFilePath=note.themeImg.split('/').pop()
            filepaths.push(pdfFilePath)
            imagePaths.push(imageFilePath)
        })

        if(filepaths.length>0){
            const {error:fileDeleteError}=await supabaseAdmin.storage.from('Notes').remove(filepaths)
            if(fileDeleteError){
                throw fileDeleteError
            }
        }
        if(imagePaths.length>0){
            const {error:imageDeleteError}=await supabaseAdmin.storage.from('Notes').remove(imagePaths)
            if(imageDeleteError){
                throw imageDeleteError
            }
        }

        const {error:deleteNotesError}=await supabase.from('CourseNotes')
        .delete()
        .eq('posted_by',id)

        if(deleteNotesError){
            throw deleteNotesError
        }

        const {error:deleteProfileError}=await supabase.from('UsersGen')
        .delete()
        .eq('user_id',id)

        if(deleteProfileError){
            throw deleteProfileError
        }



        const {data,error:deleteUserError}=await supabaseAdmin.auth.admin.deleteUser(id)
        if(deleteUserError){
            throw deleteUserError
        }
        res.status(200).json({message:"User and all related data deleted successfully"})
    }
    catch(err){
        res.status(404).json({error:err.message})
    }
})



export default authRouter;