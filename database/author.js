const mongoose= require("mongoose");

// Creating book schema
const AuthorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String]
});

const AuthorModel = mongoose.model(AuthorSchema);

module.exports = AuthorModel;