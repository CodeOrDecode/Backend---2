const mongoose = require("mongoose");

const Noteschema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    userid:{type:String},
    username:{type:String},

}, { versionKey: false })

const Notemodel = mongoose.model("note", Noteschema);

module.exports = Notemodel;