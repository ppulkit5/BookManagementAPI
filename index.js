 require("dotenv").config();

 //Framework
 const express = require('express');
 const mongoose = require('mongoose');

//  //Database
//  const database=require("./database/index");

//  // Models
//   const BookModel = require("./database/book");
//   const AuthorModel = require("./database/author");
//   const PublicationModel = require("./database/publication");

  // Microservices Routes
  const Books = require("./API/Book");
  const Authors = require("./API/Author");
  const Publications = require("./API/Publication");

 // initialize express
 const app=express();

 // Configurations
 app.use(express.json());

 // Establish database connection
 mongoose.connect(process.env.MONGO_URL)
 .then(()=>console.log("Connection established!!!"));
 

// Initializing Microservices 
 app.use("/book", Books);
 app.use("/author",Authors);
 app.use("/publication",Publications);


 app.listen(3000, () => {
     console.log(`Server is running`);
 });  