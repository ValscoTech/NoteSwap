import supabase from '../database/supabaseClient.js';
import supabaseAdmin from '../database/supabaseAdmin.js';
const notesRouter=require('express').Router();


import multer, { memoryStorage } from 'multer';
const storage=memoryStorage();
const upload=multer({storage:storage});

notesRouter.get('/',async (req,res)=>{
    
    try{
        
        if(!req.user){
            return res.status(401).json({error:"Unauthorized"});
        }
        let queryToGetNotes= supabase.from('CourseNotes').select('*');

        

        if(req.query.minPrice){
            queryToGetNotes=queryToGetNotes.gte('price',req.query.minPrice);
        }

        if(req.query.maxPrice){
            queryToGetNotes=queryToGetNotes.lte('price',req.query.maxPrice);
        }

        if(req.query.courseId){
            queryToGetNotes=queryToGetNotes.eq('courseId',req.query.courseId);
        }
        if(req.query.posted_by){
            queryToGetNotes=queryToGetNotes.eq('posted_by',req.query.posted_by);
        }

        if(req.query.modulesCovered){
            const modules=req.query.modulesCovered.split(',').map(module=>module.trim())
            queryToGetNotes=queryToGetNotes.contains('modulesCovered',modules);
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

notesRouter.post('/',upload.fields([{name:'pdfFile',maxCount:1},{name:'imageFile',maxCount:1}]),async (req,res)=>{
    
    
    const pdfFile=req.files['pdfFile']?req.files['pdfFile'][0] : null
    const imageFile=req.files['imageFile']?req.files['imageFile'][0] : null
    if(!pdfFile || !imageFile){
        return res.status(400).json({error:"Please upload the pdf and the image"})
    }


    try{

        
        const {price,stockRemaining,courseId,modulesCovered}=req.body
        const posted_by=req.user.id;
        

        const pdfName=`${pdfFile.originalname.split('.')}`
        const {data:pdfData,error:pdfError}=await supabaseAdmin.storage.from('Notes').upload(pdfName,pdfFile.buffer,{
            upsert:true,
            contentType:pdfFile.mimetype})
        if(pdfError){
            throw pdfError;
        }

        const imageName=`${imageFile.originalname.split('.')}`
        const {data:imageData,error:imageError}=await supabaseAdmin.storage.from('Notes').upload(imageName,imageFile.buffer,{
            upsert:true,
            contentType:imageFile.mimetype
        })

        if(imageError){
            throw imageError;
        }

        const fileUrl= supabase.storage.from('Notes').getPublicUrl(pdfName).data.publicUrl;
        const themeImg= supabase.storage.from('Notes').getPublicUrl(imageName).data.publicUrl;

        const {data,error}=await supabase.from('CourseNotes').insert([{price,stockRemaining,courseId,themeImg,modulesCovered,fileUrl,posted_by}]).select();
        if(error){
            throw error;
        }

        res.status(201).json(data);
    }
    catch(err){
        console.log(err)
    }
})



export default notesRouter;

