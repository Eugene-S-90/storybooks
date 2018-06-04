const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema

const UserShema = new Schema({
    googleID:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
    },
    LastName:{
        type:String,
    },
    image:{
        type:String,
    },
});

// create collection and add schema

mongoose.model('users',UserShema);