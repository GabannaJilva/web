const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const materiaSchema = Schema({
 
    numero: Number,
    materia: String,
    professor: String
   
    });
    module.exports = mongoose.model("Materia", materiaSchema);