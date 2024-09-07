const profileRouter=require('express').Router();   
import supabase from '../database/supabaseClient.js';
import supabaseAdmin from '../database/supabaseAdmin.js';
import multer, { memoryStorage } from 'multer';
const storage=memoryStorage();
const upload=multer({storage:storage});


profileRouter.get('/',async(req,res)=>{

    const id=req.user.id;
    console.log(id)
    try{
        const {data,error}=await supabase.from('UsersGen').select('*').eq('user_id',id);
        if(error){
            throw error;
        }
        
        res.status(200).json(data);
    }
    catch(error){
        res.status(404).json({error:error.message});
    }

})


profileRouter.post('/',upload.fields([{name:'profileImg',maxCount:1}]),async(req,res)=>{
    
    console.log(req.user.id)
    console.log(req.user.email)
    const profileImg=req.files['profileImg']?req.files['profileImg'][0] : null
    console.log(profileImg)
    
    const {name,block,dept,specialization,sold,purchased,phone}=req.body

    try{
        const profilePicName=`${profileImg.originalname.split('.')}`
        console.log(profilePicName)
        const {data:imageData,error:errorData}=await supabaseAdmin.storage.from('Notes').upload(profilePicName,profileImg.buffer,{
            upsert:true,
            contentType:profileImg.mimetype
        })

        const image_url= supabase.storage.from('Notes').getPublicUrl(profilePicName).data.publicUrl
        console.log(image_url)
        
        const soldNo=req.body.sold?req.body.sold:0
        const purchasedNo=req.body.purchased?req.body.purchased:0
        console.log(soldNo+" "+purchasedNo)
        const id=req.user.id
        console.log(id)
        const username=req.user.username?req.user.username:req.user.email
        const {data:dataIn,error:errorIn}=await supabase.from('UsersGen').insert([{user_id:id,image_url,block,dept,specialization,sold:soldNo,purchased:purchasedNo,name,phone,username}]).select()
        console.log(dataIn)
        res.status(201).json(dataIn);
    }
    catch(error){
        res.status(404).json({error:error.message});    
    }
})

profileRouter.put('/',async(req,res)=>{
    const user=req.user
    const id=user.id

    try{
        
            const {data,error}=await supabase.from('UsersGen').update(req.body).eq('user_id',id).select()
            if(error){
                throw error;
            }
            res.status(200).json(data);
        }
        catch(error){
            res.status(404).json({error:error.message});
    }

})

profileRouter.delete('/',async(req,res)=>{
    const id=req.user.id;

    try{
        const {data,error}=await supabase.from('UsersGen').delete().eq('id',id).select()
        if(error){
            throw error;
        }
        res.status(200).send("Deleted successfully"); 
    }
    catch(error){
        res.status(404).json({error:error.message});
    }
})

export default profileRouter;


