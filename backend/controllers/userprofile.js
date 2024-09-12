import express from 'express';
const profileRouter=express.Router();
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
    
    
    const profileImg=req.files['profileImg']?req.files['profileImg'][0] : null
    const {name,block,dept,specialization,sold,purchased,phone}=req.body

    try{

        const profilePicName=`${req.user.id}-profilePic`

        
        const {data:imageData,error:errorData}=await supabaseAdmin.storage.from('Notes').upload(profilePicName,profileImg.buffer,{
            upsert:true,
            contentType:profileImg.mimetype
        })

        const image_url= supabase.storage.from('Notes').getPublicUrl(profilePicName).data.publicUrl
        
        
        const soldNo=req.body.sold?req.body.sold:0
        const purchasedNo=req.body.purchased?req.body.purchased:0
        
        const id=req.user.id
    
        const username=req.user.username?req.user.username:req.user.email
        const {data:dataIn,error:errorIn}=await supabase.from('UsersGen').insert([{user_id:id,image_url,block,dept,specialization,sold:soldNo,purchased:purchasedNo,name,phone,username}]).select()
        
        res.status(201).json(dataIn);
    }
    catch(error){
        res.status(404).json({error:error.message});    
    }
})


profileRouter.put('/',upload.fields([{name:'profileImg',maxCount:1}]),async(req,res)=>{
    const user=req.user
    const id=user.id


    const fieldsToUpdate = ['name', 'block', 'dept', 'specialization', 'sold', 'purchased', 'phone'];
    let updates = {};

    fieldsToUpdate.forEach(field => {
        if (req.body[field] !== undefined) {
            updates[field] = req.body[field];
        }
    });

    const profileImg=req.files['profileImg']?req.files['profileImg'][0]:null

    try{    
            if(profileImg){
                const profileImgName=`${req.user.id}-profilePic`
                const {data:imageData,error:errorData}=await supabaseAdmin.storage.from('Notes').upload(profileImgName,profileImg.buffer,{
                    upsert:true,
                    contentType:profileImg.mimetype
                })

                if(errorData){
                    throw errorData
                }

                const image_url=supabase.storage.from('Notes').getPublicUrl(profileImgName).data.publicUrl
                updates.image_url=image_url
            }

            const {data,error}=await supabase.from('UsersGen').update(updates).eq('user_id',id).select()
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
        const {data:dataIn,error:errorIn}=await supabase.storage.from('Notes').remove(`${req.user.id}-profilePic`)
        if(error){
            throw error;
        }
        if(errorIn){
            throw errorIn;
        }
        res.status(200).send("Deleted successfully"); 
    }
    catch(error){
        res.status(404).json({error:error.message});
    }
})

export default profileRouter;


