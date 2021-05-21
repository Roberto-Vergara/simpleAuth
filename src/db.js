const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://localhost/usuarios",{ //u should active mongod.exe, if u dunno what is it, F for u
    useUnifiedTopology:true,
    useNewUrlParser:true
})
    .then(()=>console.log("database is conected"))
    .catch((e)=>console.log("some error"));

module.exports = connection;

//if u want use clound mongo, u should create a new db