const express = require('express');
const documentRouter = express.Router();
const Document = require('../model/document');
const documentRepo = require("../repository/document-repository")
const documentController = require("../controller/document-controller")

documentRouter.get('/',documentController.getMetada);
documentRouter.get('/document/:id',documentController.getDocument);
documentRouter.get('/document/metadata/:id',documentController.getDocumentMetadata);
documentRouter.post('/document', documentController.saveDocument);
documentRouter.put('/document/:id',documentController.updateDocument);
documentRouter.delete('/document/:id', documentController.deleteDocument);

module.exports = documentRouter;