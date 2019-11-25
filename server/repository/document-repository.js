const Document = require('../model/document')

const save = async (document) => {
    return await Document.create(document);
}
const get = async (documentId) => {
    return await Document.findById({ _id: documentId });
}
const update = async (documentId, updatedDocument) => {
    return await Document.findByIdAndUpdate({ _id: documentId }, updatedDocument, { new: true });

}
const remove = async (documentId) => {
    return await Document.findByIdAndRemove({ _id: documentId });
}
const findAllRootDocuments = async () => {
    return await Document.find({parentId : ""}, '_id title parentId children type');
}
const updateById = async (id, values) => {
    await Document.findByIdAndUpdate(id , values)
}
const getMetadata = async (documentId)  => {
    return await Document.findById(documentId, '_id title parentId children type');
}
const getByPropertyName = async (documentId,propertyName) => {
    return await Document.findById(documentId, propertyName);

}
const removeAllSubDocuments = (documentId) =>{
    Document.remove({
        ancestors: documentId
      }).exec()
    

}

module.exports = {
    save,
    get,
    update,
    remove,
    findAllRootDocuments,
    updateById,
    getMetadata,
    getByPropertyName,
    removeAllSubDocuments

};