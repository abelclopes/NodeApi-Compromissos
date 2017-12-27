var Compromisso = require('../models/compromisso.model.js');

exports.create = function(req, res) {
    // Create and Save a new compromisso
    if(!req.body.titulo) {
        res.status(400).send({message: "compromisso can not be empty"});
    }
    var compromisso = new Compromisso({
            titulo: req.body.titulo || "Untitled compromisso",
            descricao: req.body.descricao,
            dataInicio: req.body.dataInicio,
            dataFim: req.body.dataFim,
            status: req.body.status
        });

    Compromisso.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the compromisso."});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    var perPage = req.params.tamanhoPagina || 9
    var page = req.params.page || 1
    // deveria funcionar a paginação.
    
    Compromisso.find()
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, results) {
        console.log(results);        
        Compromisso.count().exec(function(err, count) {
            if (err) return next(err)
            res.json({
                resultado: results,
                numeroPagina: page,
                temPaginaAnterior: ((page > Math.ceil(count / perPage))?true:false),
                temPaginaPosterior: ((page < Math.ceil(count / perPage))?true:false),
                totalItens: count,
                numeroPaginaPosterior: page + 1,
                numeroPaginaAnterior: ((page > 0 ) ? (page - 1): 0),
                pages: Math.ceil(count / perPage)
            })
        })
    });
};
// exports.findAll = function(req, res) {
//     // Retrieve and return all notes from the database.
//     Compromisso.find(function(err, compromissos){
//         if(err) {
//             res.status(500).send({message: "Some error occurred while retrieving notes."});
//         } else {
//             res.send(compromissos);
//         }
//     });
// };

exports.findOne = function(req, res) {
    // Find a single compromisso with a compromissoId
    Compromisso.findById(req.params.compromissoId, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve compromisso with id " + req.params.compromissoId});
        } else {
            res.send(data);
        }
    });
};

exports.update = function(req, res) {
    // Update a compromisso identified by the compromissoId in the request
    Compromisso.findById(req.params.compromissoId, function(err, compromisso) {
        if(err) {
            res.status(500).send({message: "Could not find a compromisso with id " + req.params.compromissoId});
        }

        Compromisso.title = req.body.title;
        Compromisso.content = req.body.content;

        Compromisso.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update compromisso with id " + req.params.compromissoId});
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = function(req, res) {
    // Delete a compromisso with the specified compromissoId in the request
    Compromisso.remove({_id: req.params.compromissoId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete compromisso with id " + req.params.id});
        } else {
            res.send({message: "compromisso deleted successfully!"})
        }
    });
};