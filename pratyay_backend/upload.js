import express from 'express';
import { createClient } from '@supabase/supabase-js';

import multer from 'multer';
import env from "dotenv";
env.config();
const app = express();
const port = 3000;
const supabase = createClient(process.env.URL,process.env.API);


app.use(express.json())
app.use(express.urlencoded({extended:true}));

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post('/upload/file',upload.single('file'),async(req,res)=>{
    const file=req.file;
    const id=req.body.id;
    console.log(req.body.id);
    const { data, error } = await supabase
  .from('CourseNotes')
  .select()
  .eq('id', id);
  console.log(data.length);

  if(error){
    console.log(error);

  }



  if(data.length>0){


   if(!file){
        res.status(400).send("no file upload");

    }
    
  

    else{ 
        
        const name=file.originalname;
        const { data, error } = await supabase.storage.from('Notes').upload(name, file.buffer, {
            upsert: true,
            //contentType: 'image/png',
          });
          if(error){
            throw error;
        }
      try{
        const  data1  = supabase
        .storage
        .from('Notes')
        .getPublicUrl(name);

        console.log(data1.data.publicUrl);
        const { error1 } = await supabase.from('CourseNotes').update({ storage: data1.data.publicUrl }).eq('id', id);
      if(error1){  
      console.log(error1);
      res.status(400).send("no data");
    }

      }
      catch(error){

        console.log(error);
        req.status(400).send("Not uploaded");


      }
      
      
      }}

      else{
         res.status(400).send("No data found");

      }



})

app.post('/upload/image',upload.single('file'),async(req,res)=>{
  const file=req.file;
  const id=req.body.id;
  console.log(req.body.id);
  console.log(file);

  const { data, error } = await supabase
  .from('UsersGen')
  .select()
  .eq('user_id', id);
  console.log(data.length);

 
  console.log(error);


 if(data.length>0){

 
 if(!file){
      res.status(400).send("no file upload");

  }
  


 else{ 
      
      const name=file.originalname;
      const { data, error } = await supabase.storage.from('NoteSwap').upload(name, file.buffer, {
          upsert: true,
          contentType: 'image/png',
        });
        if(error){
          throw error;
      }
    try{
      const  data1  = supabase
      .storage
      .from('NoteSwap')
      .getPublicUrl(name);

      console.log(data1.data.publicUrl);
      const { error } = await supabase.from('UsersGen').update({ image_url: data1.data.publicUrl }).eq('user_id', id);
    if(error){ 
    console.log(error);
    res.status(400).send("no data");}


    }
    catch(error){

      req.status(400).send("Not uploaded");

      console.log(error);

    }
    
    
    }}
    else{

      res.status(400).send("No data found");

    }



})
        
       

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });