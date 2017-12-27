// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var compromissos = mongoose.model('compromissos');

// ROTA BUSCAR ============================================
router.get('/api/compromissos/page/:page', function (req, res, next) {
    var perPage = 9
    var page = req.params.page || 1
    // utilizaremos o mongoose para buscar todos os compromissos no BD
    compromissos.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, comp) {
            compromissos.count().exec(function(err, count) {
                if (err) return next(err)
                res.json({
                    compromissos: comp,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
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
        res.json(compromisso);    
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
