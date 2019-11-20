const express = require('express');
const documentRouter = express.Router();
const Document = require('../model/document');
const documentRepo = require("../repository/document-repository")

//initail  load of documents tree meta data
documentRouter.get('/', async (req, res, next) => {
    let docs = await documentRepo.metaData().catch(next);
    res.send(docs);
});

documentRouter.get('/document/:id', async (req, res, next) => {
    let document = await documentRepo.get(req).catch(next);
    res.send(document);
});
documentRouter.post('/document', async (req, res, next) => {

    let document = await documentRepo.save(req).catch(next);
    res.send(document);


});
documentRouter.put('/document/:id', async (req, res, next) => {
    let document = await documentRepo.update(req);
    res.send(document);

});
documentRouter.delete('/document/:id', async (req, res, next) => {
    let document = await documentRepo.delete(req);
    res.send(document);
});

module.exports = documentRouter;