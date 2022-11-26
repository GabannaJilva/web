const express = require("express");
const routes = express.Router();
const auth = require("../middlewares/alunoAuth");
const alunoController = require("../controller/alunoController");


routes.get("/alunos",auth, alunoController.listar);
routes.post("/alunos", alunoController.cadastrarPost);
routes.get("/alunos/cadastrarAlunos/:matricula?", alunoController.cadastrar);
routes.get("/alunos/remover/:matricula/",auth, alunoController.remover);
routes.get("/alunos/login", alunoController.login);
routes.get("/alunos/logout", alunoController.logout);
routes.post("/alunos/login", alunoController.loginPost);
routes.get("/alunos/remover/:matricula/",auth, alunoController.remover);
routes.get("/alunos/:matricula/",auth, alunoController.detalhar);


module.exports = routes; 