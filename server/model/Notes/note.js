const mongoose = require('mongoose');
const Schema  = mongoose.Schema


const note_schema = new Schema({
title:String,
modified_date:Date,
description:String,
client_id:String,
note_id:String,
})

exports.notemodel = new mongoose.model('notes',note_schema)