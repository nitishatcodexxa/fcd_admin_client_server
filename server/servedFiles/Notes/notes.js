const notemodel = require('../../model/Notes/note');
const { v4: uuidv4 } = require('uuid');

exports.addNotes = (req,res)=>{
  const note =  new notemodel.notemodel({
title:req.body.title,
modified_date:Date(),
description:req.body.description,
client_id:req.body.client_id,
note_id:uuidv4(),
  })
note.save().then(()=>{
    res.send({"data":"ok"})
})}


exports.retriveNote=(req,res)=>{
    notemodel.notemodel.find({}).then((data)=>{
        res.send({data:data})
    })
}

exports.deleteNote=(req,res)=>{
    notemodel.notemodel.deleteOne({note_id:req.body.note_id}).then((c)=>{
res.send({"data":"delete"})
    })
}


exports.editNote=(req,res)=>{
    notemodel.notemodel.updateOne({note_id:req.body.note_id},
    {   title:req.body.title,
        description:req.body.description,
       
    }).then((dd)=>{
res.send({data:"iu"})
    })
}
