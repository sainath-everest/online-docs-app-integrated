const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//creating user schema and model
const documentSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Name filed is required']
        },
        type: {
            type: String,
        },
        data  : {
            type : String,
            default: ""
        },
        parentId: {
            type: String,
        },
        children : {
            type : [String]
        },
        creationDate: {
             type: Date, 
             default: Date.now 
         },
         lastUpdated: {
            type: Date, 
            default: Date.now 
        }

    }
);

const Document = mongoose.model('document', documentSchema);

module.exports = Document;