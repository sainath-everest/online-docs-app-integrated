const documentRepo = require("../repository/document-repository")
const getMetada = async () => {
    return await documentRepo.findAllRootDocuments();
}
const getDocumentById = async (documentId) => {
    return await documentRepo.get(documentId);
}
const saveDocument = async (document) => {
    let newDocument = await documentRepo.save(document);
    if (document.parentId) {
        await documentRepo.updateById(document.parentId, { $push: { "children": [newDocument._id] } });
    }
    return newDocument;

}
const updateDocument = async (documentId, updatedDocument) => {
    return await documentRepo.update(documentId, updatedDocument);
}

const deleteDocument = async (documentId) => {
    const document = await documentRepo.remove(documentId);
    
    if (document.parentId) {
        console.log("in delete")
        await documentRepo.updateById(document.parentId, { $pull: {"children": documentId } });

    }
    let children = document.children;
    await children.forEach(async (element) => {
        await documentRepo.remove(element);

    });
    return document;

}
const getDocumentMetadataById = async(documentId) => {
    return await documentRepo.getMetadata(documentId)

}
module.exports = {
    getMetada,
    getDocumentById,
    saveDocument,
    updateDocument,
    deleteDocument,
    getDocumentMetadataById
}