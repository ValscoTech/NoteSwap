const profileRouter=require('express').Router();   
const supabase=require('../supabaseclient');



//Get the profile info a particular user
profileRouter.get('/:id',async(req,res)=>{

    const id=req.params.id;
    try{
        const {data,error}=await supabase.from('UsersGen').select('*').eq('id',id);
        if(error){
            throw error;
        }
        
        res.status(200).json(data);
    }
    catch(error){
        res.status(404).json({error:error.message});
    }

})


profileRouter.post('/',async(req,res)=>{
    
    const {username,name,block,dept,specialization,image_url,phone}=req.body

    try{
        const {data:dataBack,error:errorBack}=await supabase.from('UserCred').select('id').eq('username',username);
        
        
        const id=dataBack[0].id
        const sold=0
        const purchased=0

        const {data:dataIn,error:errorIn}=await supabase.from('UsersGen').insert([{id,image_url,block,dept,specialization,sold,purchased,username,name,phone}]).select('*')

        res.status(201).json(dataIn);
    }
    catch(error){
        res.status(404).json({error:error.message});    
    }
})

profileRouter.put('/:id',async(req,res)=>{
    const id=req.params.id


    try{
        //const {data:user,error:errorUser}=await supabase.from('UserCred').select('username').eq('id',id)
        const {data,error}=await supabase.from('UsersGen').update(req.body).eq('id',id).select()
        if(error){
            throw error;
        }
        res.status(200).json(data);
    }
    catch(error){
        res.status(404).json({error:error.message});
    }

})

profileRouter.delete('/:id',async(req,res)=>{
    const id=req.params.id;

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

module.exports=profileRouter;


