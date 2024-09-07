const supabase=require('../supabaseclient');

const authenticateUser=async(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1];
    try{
        const {data,error}=await supabase.auth.getUser(token);
        
    
        if(error){
            throw error
        }
        
        req.user=data.user
        next();
    }
    catch(err){
        res.status(404).json({error:err.message})
    }
}

module.exports={authenticateUser};