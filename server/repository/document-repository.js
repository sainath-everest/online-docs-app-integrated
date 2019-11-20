const Document = require('../model/document')

const documentRepo = {
    save: async (req) => {
        const document = await Document.create(req.body);
        if(document.parentId){
            await Document.findByIdAndUpdate(req.body.parentId, { $push: { "children": [document._id] } });
        }
        return document;
    },
    get: async (req) => {
        const document = await Document.findById({ _id: req.params.id });
        return document;

    },
    update: async (req) => {
        const document = await Document.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        return document;

    },
    delete: async (req) => {
        const document = await Document.findByIdAndRemove({ _id: req.params.id });
        if(document.parentId){
            await Document.findByIdAndUpdate(document.parentId, { $pull: { "children": document._id } });

        }
       
        let children = document.children;
        children.forEach(element => {
            Document.findByIdAndRemove(element).then(() => {

            })

        });
        return document;
    },
    metaData: async () => {
        const initialData = await Document.find({}, '_id title parentId children type');
        if(initialData.length == 0){
            await Document.create({"title":"root","type":"folder","parentId":"",children:[]});
        }
        
        const docs = await Document.find({}, '_id title parentId children type');
        return docs;

    }
}

module.exports = documentRepo;