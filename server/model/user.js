const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating geo-location schema
const GeoSchema = new Schema(
    {
        type : {
            type : String,
            default : "Point"
        },
        coordinates : {
            type : [Number],
            index : "2dsphere"
        }

    }
   
);

//creating user schema and model
const userSchema = new Schema(
    {
        name : {
            type : String,
            required : [true,'Name filed is required']
        },
        city : {
            type : String,
        },
        active : {
            type: Boolean,
            default : false


        },
        geometry : GeoSchema
    }
);

 const User  = mongoose.model('user',userSchema);

 module.exports = User;