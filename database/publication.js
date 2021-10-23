const mongoose= require("mongoose");

// Creating book schema
const PublicationSchema = mongoose.Schema({
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

const PublicationModel = mongoose.model("publications",PublicationSchema);

module.exports = PublicationModel;