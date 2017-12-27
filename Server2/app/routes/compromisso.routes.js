module.exports = function(app) {
    
        var compromissos = require('../controllers/compromisso.controller.js');
    
        // Create a new compromisso
        app.post('/api/compromissos', compromissos.create);
    
        // Retrieve all compromissos
        app.get('/api/compromissos/:page/:tamanhoPagina', compromissos.findAll);
    
        // Retrieve a single compromisso with compromissoId
        app.get('/api/compromissos/:compromissoId', compromissos.findOne);
    
        // Update a compromisso with compromissoId
        app.put('/api/compromissos/:compromissoId', compromissos.update);
    
        // Delete a compromisso with compromissoId
        app.delete('/api/compromissos/:compromissoId', compromissos.delete);
    }