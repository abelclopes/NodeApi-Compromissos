// Compromissos.js
var mongoose = require('mongoose');

// Cria um novo Schema com os campos que iremos utilizar no model Compromissos
var CompromissosSchema = new mongoose.Schema({
    titulo: String,
    derscricao: String,
    dia: Date,
    hora: Date,
    derscricao: String,
    status: String
});

//Define o model Compromisso
mongoose.model('Compromissos', CompromissosSchema);