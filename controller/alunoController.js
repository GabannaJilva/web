const AlunoModels = require("../models/AlunoModels");
const bcryptjs = require("bcryptjs")

class AlunoController{
    static async listar(req, res) {
        const salvo = req.query.cad;
        const alterado = req.query.alt;
        const removido = req.query.rem;
        const erro = req.query.e;
        const lista = await AlunoModels.find();
        res.render("aluno/listarAluno", {lista, salvo, alterado, removido, erro}); 
    }

    static async cadastrar(req, res) {
        const matricula = req.params.matricula;
        const erro = req.query.e;
        let aluno={};
        console.log("entrou")
        let escondido = "";
        if (matricula){
            aluno = await AlunoModels.findOne({matricula: matricula})
            escondido = "hidden"
        }
        res.render("aluno/cadastrarAluno", {aluno, escondido, erro});
    }

    static async detalhar(req, res) {
        const matricula = req.params.matricula;
        const resultado = await AlunoModels.findOne({matricula: matricula})
        res.render("aluno/detalharAluno", {resultado})
    }

    static async remover(req, res) {
        const matricula = req.params.matricula;
        await AlunoModels.findOneAndDelete({ matricula});
        res.redirect("/alunos?rem=1");   
    }
    // static async atualizar(req, res) {
    //     const codigo = req.params.codigo;
    //     await PessoaModel.findOneAndUpdate({codigo: 1});
    //     { }; 
    // }
        
    static async cadastrarPost(req, res){
        const p = req.body;
        const salt = bcryptjs.genSaltSync();
        const hash = bcryptjs.hashSync(p.senha, salt);
        //const mat = await AlunoModels.findOne({matricula: p.matricula});
        //atualizar
        if (p.id){
            await AlunoModels.findOneAndUpdate({matricula: p.matricula},
            {
                nome: p.nome,
                serie: p.serie
            });
            res.redirect("/alunos?alt=1")
        //cadastrar
        } else {
            const p = req.body;
            const resultado = await AlunoModels.findOne({matricula:p.matricula})
            console.log(resultado)
            if(resultado){
                res.redirect("/alunos/cadastrar?cad=1")
            }else{
            const novoAluno = new AlunoModels({
                matricula: p.matricula,
                nome: p.nome,
                serie: p.serie,  
                senha: hash,  
                });
                console.log(novoAluno)
                await novoAluno.save();
                res.redirect("/alunos?cad=1");
            }
        }
    }
    
        static async logout(req, res) {
            req.session.aluno = undefined;
            res.redirect("/alunos/login")
        }
        static async login(req, res) {
            if(req.session.aluno){
                console.log("Chegou aq");
                res.redirect("/");
            } else{
                const erro = req.query.e;
                res.render("aluno/login", {erro});
            }
        }
        static async loginPost(req, res) {
            const aluno = req.body;
            const resultado= await AlunoModels.findOne({matricula: aluno.matricula})
            if(resultado){
                if(bcryptjs.compareSync(aluno.senha, resultado.senha)){
                    req.session.aluno = resultado.matricula;
                    res.redirect("/")
                } else{
                    res.redirect("/alunos/login?e=1")
                }
            }else{
                res.redirect("/alunos/login?e=1");
            }
            };
    }
    

module.exports = AlunoController;