const express = require("express");
const { redirect } = require("express/lib/response");
const app = express();

//TUDO DE CÓDIGO É DEPOIS DO EXPRESS
 
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

require('dotenv/config');

const session = require("express-session");
app.use(session({
    secret: 'ifpe',
    saveUnitalized:false,
    resave: false
}));

//MongoBD
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
const alunoModels = require("./models/alunoModels");
const materiaModels = require("./models/materiaModels");
 
const alunosRoutes = require("./routes/alunoRoutes");
    app.use(alunosRoutes)
    
const materiasRoutes = require("./routes/materiaRoutes");
    app.use(materiasRoutes)

const auth = require("./middlewares/alunoAuth");
app.get("/", auth, function(req, res){
    res.render("index");
});
   
app.listen(999, function(){
    console.log("Servidor iniciado!");
});
 
