const mongoose= require("mongoose");

// Creating book schema
const BookSchema = mongoose.Schema({
    ISBN:  {
        type : String,
        required : true,
        minLength : 8,
        maxLength : 12   
    },
    title: {
        type : String,
        required : true,
        maxLength : 20   
    },
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication: Number
});

const BookModel = mongoose.model("books",BookSchema);

module.exports = BookModel;