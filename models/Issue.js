const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
    accession_no: {
        type: String,
    },
    userId: {
        type: String,
    },
    userName: {
        type: String,
    },
    userBranch: {
        type: String,
    },
    bookId: {
        type: String,
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
    },

    noOfday: {
        type: Number,
    },
    isIssue: {
        type: Boolean,
        default: false,
    },
    isRecom: {
        type: Boolean,
        default: false,
    },
    return_Count: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

module.exports = mongoose.model("Issue", IssueSchema);