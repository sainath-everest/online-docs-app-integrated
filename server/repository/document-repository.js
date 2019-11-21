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
const findAllDocuments = async () => {
    return await Document.find({}, '_id title parentId children type');
}
const updateById = async (id, values) => {
    await Document.findByIdAndUpdate({ _id: id }, values)
}

module.exports = {
    save,
    get,
    update,
    remove,
    findAllDocuments,
    updateById

};