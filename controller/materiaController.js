const MateriaModels = require("../models/materiaModels");

class materiaController{
    static async listarMateria(req, res) {
        const salvo = req.query.cad;
        const alterado = req.query.alt;
        const removido = req.query.rem;
        const lista = await MateriaModels.find();
        res.render("materia/listarMateria", { lista, salvo, alterado, removido}); 
    }

    static async cadastrarMateria(req, res) {
        const numero = req.params.numero;
        const erro = req.query.e;
        let materia={};
        console.log("entrou")
        //let escondido = "";
        if (numero){
            materia = await MateriaModels.findOne({numero: numero})
            //escondido = "hidden"
        }
        res.render("materia/cadastrarMateria", {materia, erro});
    }

    static async detalharMateria(req, res) {
        const numero = req.params.numero;
        console.log(numero)
        const resultado = await MateriaModels.findOne({numero: numero})
        console.log(resultado)
        res.render("materia/detalharMateria", {resultado})
    }

    static async removerMateria(req, res) {
        const numero = req.params.numero;
        await MateriaModels.findOneAndDelete({ numero});
        res.redirect("/materias?rem=1");   
    }

    static async cadastrarPost(req, res){
        const p = req.body;
        //atualizar
        const num = await MateriaModels.findOne({numero: p.numero});
        if (p.id = num){
            await MateriaModels.findOneAndUpdate({numero: p.numero},
            {
                materia: p.materia,
                professor: p.professor    
            });
            res.redirect("/materias?alt=1")
        //cadastrar
        } else {
            const p = req.body;
            const resultado = await MateriaModels.findOne({numero:p.numero})
            if(resultado){
                res.redirect("/materias/cadastrar?cad=1")
            }else{
            const novaMateria = new MateriaModels({
                numero: p.numero,
                materia: p.materia,
                professor: p.professor,   
                });
                await novaMateria.save();
                res.redirect("/materias?cad=1");
            }
        }
    }
}


module.exports = materiaController;