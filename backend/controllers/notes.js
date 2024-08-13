const supabase=require('../supabaseclient');
const notesRouter=require('express').Router();



notesRouter.get('/',async (req,res)=>{
    try{
        let queryToGetNotes= supabase.from('CourseNotes').select('*');

    

        if(req.query.minPrice){
            queryToGetNotes=queryToGetNotes.gte('price',req.query.minPrice);
        }

        if(req.query.maxPrice){
            queryToGetNotes=queryToGetNotes.length('price',req.query.maxPrice);
        }

        if(req.query.courseId){
            queryToGetNotes=queryToGetNotes.eq('courseId',req.query.courseId);
        }
        if(req.query.posted_by){
            queryToGetNotes=queryToGetNotes.eq('posted_by',req.query.posted_by);
        }
        const {data,error}=await queryToGetNotes;
        if(error){
            throw error;
        }
        res.json(data);
    }

    catch(error){
        res.status(500).json({error:error.message});
    }
})

notesRouter.post('/',async (req,res)=>{
    try{
        const {posted_by,price,stockRemaining,courseId,themeImg,modulesCovered}=req.body


        const {data,error}=await supabase.from('CourseNotes').insert([{posted_by,price,stockRemaining,courseId,themeImg,modulesCovered}]).select();
        if(error){
            throw error;
        }

        res.status(201).json(data);
    }
    catch(err){
        console.log(err)
    }
})

module.exports=notesRouter;