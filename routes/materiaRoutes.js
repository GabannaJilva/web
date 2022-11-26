const express = require("express");
const routes = express.Router();
const auth = require("../middlewares/alunoAuth");
const materiaController = require("../controller/materiaController");

routes.get("/materias", auth, materiaController.listarMateria);
routes.post("/materias",auth, materiaController.cadastrarPost);
routes.get("/materias/cadastrar/:numero?",auth, materiaController.cadastrarMateria);
routes.get("/materias/remover/:numero/",auth, materiaController.removerMateria);
routes.get("/materias/:numero/",auth, materiaController.detalharMateria);


module.exports = routes;