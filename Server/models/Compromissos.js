// Compromissos.js
var mongoose = require('mongoose');

// Cria um novo Schema com os campos que iremos utilizar no model Compromissos
var CompromissosSchema = new mongoose.Schema({
    titulo: String,
    derscricao: String,
    dataInicio: Date,
    dataFim: Date,
    status: Boolean
});

//Define o model Compromisso
mongoose.model('compromissos', CompromissosSchema);