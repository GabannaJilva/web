const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const alunoSchema = Schema({
 
    matricula: Number,
    nome: String,
    serie: Number,
    senha: String
   
    });
    mongoose.models={}
    module.exports = mongoose.model("Aluno", alunoSchema);