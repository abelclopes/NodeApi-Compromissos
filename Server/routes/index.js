// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var compromissos = mongoose.model('compromissos');

// ROTA BUSCAR ============================================
router.get('/api/compromissos/:page/:tamanhoPagina', function (req, res, next) {
    var perPage = req.params.tamanhoPagina || 9
    var page = req.params.page || 1
    // utilizaremos o mongoose para buscar todos os compromissos no BD
    compromissos.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, comp) {
            compromissos.count().exec(function(err, count) {
                if (err) return next(err)
                res.json({
                    resultado: comp,
                    numeroPagina: page,
                    temPaginaAnterior: ((page > Math.ceil(count / perPage))?true:false),
                    temPaginaPosterior: ((page < Math.ceil(count / perPage))?true:false),
                    totalItens: count,
                    numeroPaginaPosterior: page + 1,
                    numeroPaginaAnterior: ((page > 0 ) ? (page - 1): 0),
                    pages: Math.ceil(count / perPage)
                })
            })
        })
});

// ROTA CRIAR =============================================
router.post('/api/compromissos', function (req, res) {
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

        compromissos.findOne({
            _id: compromisso._id
        }, function (err, resultado) {
            if (err)
                res.send(err);
                res.json(resultado);
        });
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
    var compromissoData = {
        titulo: req.body.titulo,
        status: req.body.status,
        dataInicio: req.body.dataInicio,
        dataFim: req.body.dataFim,
        _id: req.body._id
    }
    var id = req.body._id;
    compromissos.update(
        { _id: id },
        compromissoData,
        { upsert: true },
        function (err, compromisso) {
            if (err) return res.send(err);
               compromissos.findOne({
                    _id: id
                }, function (err, resultado) {
                    if (err)
                        res.send(err);
                        res.json(resultado);
                });
        });

});

// DEFININDO NOSSA ROTA PARA O ANGULAR/FRONT-END =========
router.get('*', function (req, res) {
    // Carrega nossa view index.html que será a única da nossa aplicação
    // O Angular irá lidar com as mudanças de páginas no front-end
    res.sendfile('./public/index.html');
});

module.exports = router;
