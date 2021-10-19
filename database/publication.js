const mongoose= require("mongoose");

// Creating book schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String]
});

const PublicationModel = mongoose.model(PublicationSchema);

module.exports = PublicationModel;