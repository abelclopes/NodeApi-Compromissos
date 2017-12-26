// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var compromissos = mongoose.model('compromissos');

// ROTA BUSCAR ============================================
router.get('/api/compromissos', function (req, res) {
    // utilizaremos o mongoose para buscar todos os compromissos no BD
    compromissos.find(function (err, compromissos) {
        // Em caso de erros, envia o erro na resposta
        if (err)
            res.send(err)
        // Retorna todos os compromissos encontrados no BD
        res.json(compromissos);
    });
});

// ROTA CRIAR =============================================
router.post('/api/compromissos', function (req, res) {
    // Cria um compromisso, as informações são enviadas por uma requisição AJAX pelo Angular
    compromissos.create({
        titulo: req.body.titulo,
        derscricao: req.body.derscricao,
        dataInicio: req.body.dataInicio,
        dataFim: req.body.dataFim,
        status: req.body.status,
        done: false
    }, function (err, compromisso) {
        if (err)
            res.send(err);
        // Busca novamente todos os compromissos após termos inserido um novo registro
        console.log(compromisso);
        res.json(compromisso);        
    });

});

// ROTA DELETAR ============================================
router.delete('/api/compromissos/:compromisso_id', function (req, res) {
    // Remove o compromisso no Model pelo parâmetro _id
    compromissos.remove({
        _id: req.params.compromisso_id
    }, function (err, compromisso) {
        if (err)
            res.send(err);
        // Busca novamente todos os compromissos após termos removido o registro
        compromissos.find(function (err, compromisso) {
            if (err)
                res.send(err)
            res.json(compromissos);
        });
    });
});

// ROTA EDITAR =============================================
router.get('/api/compromissos/:compromisso_id', function (req, res) {
    // Busca o compromisso no Model pelo parâmetro id
    compromissos.findOne({
        _id: req.params.compromisso_id
    }, function (err, compromisso) {
        if (err)
            res.send(err);
        res.json(compromisso);
    });
});

// ROTA ATUALIZAR ==========================================
router.put('/api/compromissos/:compromisso_id', function (req, res) {
    // Busca o compromisso no Model pelo parâmetro id
    var compromissoData = req.body;
    var id = req.params.compromisso_id;

    compromissos.update(
        { _id: id },
        compromissoData,
        { upsert: true },
        function (err, compromisso) {
            if (err) res.send(err);
            res.json(compromisso);
        });

});

// DEFININDO NOSSA ROTA PARA O ANGULAR/FRONT-END =========
router.get('*', function (req, res) {
    // Carrega nossa view index.html que será a única da nossa aplicação
    // O Angular irá lidar com as mudanças de páginas no front-end
    res.sendfile('./public/index.html');
});

module.exports = router;
