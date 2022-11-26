function auth(req, res, next){
    if(req.session.aluno){
        next();
    } else{
        res.redirect("/alunos/login");
    }
}

module.exports = auth;