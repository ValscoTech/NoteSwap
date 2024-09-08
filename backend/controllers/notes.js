import supabase from '../database/supabaseClient.js';
import supabaseAdmin from '../database/supabaseAdmin.js';
import express from 'express';
const notesRouter=express.Router();
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

notesRouter.put('/:id', upload.fields([{ name: 'pdfFile', maxCount: 1 }, { name: 'imageFile', maxCount: 1 }]), async (req, res) => {
    const { id } = req.params; 
    const pdfFile = req.files['pdfFile'] ? req.files['pdfFile'][0] : null;
    const imageFile = req.files['imageFile'] ? req.files['imageFile'][0] : null;

    if (!id) {
        return res.status(400).json({ error: 'Note ID is required' });
    }

    const { price, stockRemaining, courseId, modulesCovered } = req.body;
    const posted_by = req.user.id;
    
    let updates = {};
    
    if (price) updates.price = price;
    if (stockRemaining) updates.stockRemaining = stockRemaining;
    if (courseId) updates.courseId = courseId;
    if (modulesCovered) {
        try {
            updates.modulesCovered = JSON.parse(modulesCovered);
        } catch (error) {
            return res.status(400).json({ error: 'Invalid modulesCovered format' });
        }
    }

    try {
        let modulesCoveredString = '';
        if (Array.isArray(updates.modulesCovered)) {
            modulesCoveredString = updates.modulesCovered.join('-');
        }

        if (pdfFile) {
            const pdfName = `${req.user.id}-${courseId}-${modulesCoveredString}-notes`;
            
            const { data: pdfData, error: pdfError } = await supabaseAdmin.storage.from('Notes').upload(pdfName, pdfFile.buffer, {
                upsert: true,
                contentType: pdfFile.mimetype
            });
            if (pdfError) {
                throw pdfError;
            }
            updates.fileUrl = supabase.storage.from('Notes').getPublicUrl(pdfName).data.publicUrl;
        }

        if (imageFile) {
            const imageName = `${req.user.id}-${courseId}-${modulesCoveredString}-themeImg`;
            const { data: imageData, error: imageError } = await supabaseAdmin.storage.from('Notes').upload(imageName, imageFile.buffer, {
                upsert: true,
                contentType: imageFile.mimetype
            });
            if (imageError) {
                throw imageError;
            }
            updates.themeImg = supabase.storage.from('Notes').getPublicUrl(imageName).data.publicUrl;
        }

        const { data, error } = await supabase.from('CourseNotes').update(updates).eq('id', id).select();
        if (error) {
            throw error;
        }

        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

notesRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        
        const { data: note, error: getNoteError } = await supabase
            .from('CourseNotes')
            .select('*')
            .eq('id', id)
            .eq('posted_by', req.user.id)
            .single();

        if (getNoteError) {
            throw getNoteError;
        }

        if (!note) {
            return res.status(404).json({ error: 'Note not found or not authorized to delete' });
        }

       
        const pdfPath = note.fileUrl.split('/').pop();
        const imagePath = note.themeImg.split('/').pop();

        
        const { error: pdfDeleteError } = await supabaseAdmin.storage.from('Notes').remove([pdfPath]);
        if (pdfDeleteError) {
            throw pdfDeleteError;
        }

        
        const { error: imageDeleteError } = await supabaseAdmin.storage.from('Notes').remove([imagePath]);
        if (imageDeleteError) {
            throw imageDeleteError;
        }

        
        const { data: deleteData, error: deleteError } = await supabase
            .from('CourseNotes')
            .delete()
            .eq('id', id);

        if (deleteError) {
            throw deleteError;
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


export default notesRouter;

