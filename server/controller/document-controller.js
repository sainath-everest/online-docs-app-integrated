const documentService = require('../service/document-service')

const getMetada = async (req, res, next) => {
    const docs = await documentService.getMetada().catch(next);
    res.send(docs);
}
const getDocument = async (req, res, next) => {
    const document = await documentService.getDocumentById(req.params.id).catch(next);
    res.send(document);
}
const saveDocument = async (req, res, next) => {
    const document = await documentService.saveDocument(req.body).catch(next);
    res.send(document);
}
const updateDocument = async (req, res, next) => {
    const document = await documentService.updateDocument(req.params.id, req.body).catch(next);
    res.send(document);
}
const deleteDocument = async (req, res, next) => {
    const document = await documentService.deleteDocument(req.params.id);
    res.send(document);
}

module.exports = {
    getMetada,
    getDocument,
    saveDocument,
    updateDocument,
    deleteDocument
}