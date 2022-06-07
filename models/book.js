const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    accession_no: {
        type: String
    },
    call_no: {
        type: String
    },

    title: {
        type: String,

    },

    author: {
        type: String,

    },

    publisher: {
        type: String,

    },

    year: {
        type: String,
        default: 2021
    },

    copies: {
        type: Number,
        default: 15
    }



}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);