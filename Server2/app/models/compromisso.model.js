// Compromissos.js
var mongoose = require('mongoose');

// Cria um novo Schema com os campos que iremos utilizar no model Compromissos
var CompromissoSchema = mongoose.Schema({
    titulo: String,
    derscricao: String,
    dataInicio: Date,
    dataFim: Date,
    status: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Compromisso', CompromissoSchema);