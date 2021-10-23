const mongoose= require("mongoose");

// Creating book schema
const AuthorSchema = mongoose.Schema({
    id: {
        type : Number,
        required : true,
        maxLength : 10   
    },
    name: {
        type : String,
        required : true
    },
    books: [String]
});

const AuthorModel = mongoose.model("authors",AuthorSchema);

module.exports = AuthorModel;