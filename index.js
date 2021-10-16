 
 //Framework
 const express = require('express');

 //Database
 const database=require("./database/index");

 // initialize express
 const app=express();

 // Configurations
 app.use(express.json());
 
 /*
 Route                /
 Description          get all books
 Access               Public
 Parameters           none  
 Method               GET
 */
 app.get('/', (req, res) => {
     return  res.json({ books: database.books});
 });

 
 /*
 Route                /is
 Description          get specific book based on isbn
 Access               Public
 Parameters           isbn 
 Method               GET
 */
 app.get('/is/:isbn', (req, res) => {
     const getSpecificBook=database.books.filter(
         (book)=>book.ISBN===req.params.isbn
         );
     
     if(getSpecificBook.length===0){
      return  res.json({
          error:`No book found for ISBN of ${req.params.isbn}`
        }); 
     }

     return  res.json({book: getSpecificBook});
});


 /*
 Route                /c
 Description          get specific books based on category
 Access               Public
 Parameters           category  
 Method               GET
 */
app.get('/c/:category', (req, res) => {
    const getSpecificBooks=database.books.filter(
        (book)=>book.category.includes(req.params.category)
        );
    
    if(getSpecificBooks.length===0){
     return  res.json({
         error:`No book found for cateogry of ${req.params.category}`
       }); 
    }

    return  res.json({book: getSpecificBooks});
});


 /*
 Route                /a
 Description          get specific books based on author
 Access               Public
 Parameters           author  
 Method               GET
 */

 app.get('/a/:author', (req, res) => {
     
    const getSpecificBooks=database.authors.filter(
        (author)=>author.name===req.params.author
        );
    
    if(getSpecificBooks.length===0){
     return  res.json({
         error:`No book found for author of ${req.params.author}`
       }); 
    }

    return  res.json({book: getSpecificBooks});
 });


 /*
 Route                /author
 Description          get all authors
 Access               Public
 Parameters           None  
 Method               GET
 */

app.get('/author', (req, res) => {
    return  res.json({authors: database.authors});
});


 /*
 Route                /author/id
 Description          get specific author based on id
 Access               Public
 Parameters           id
 Method               GET
 */
app.get('/author/id/:id', (req, res) => {
    const getSpecificauthor=database.authors.filter(
        (author)=>author.id===parseInt(req.params.id)
        );
    
    if(getSpecificauthor.length===0){
     return  res.json({
         error:`No book found for author of ${req.params.id}`
       }); 
    }

    return  res.json({book: getSpecificauthor});
});


 /*
 Route                /author
 Description          get a list of author based on book's ISBN
 Access               Public
 Parameters           isbn
 Method               GET
 */
app.get('/author/:isbn', (req, res) => {
  const getSpecificAuthors= database.authors.filter((author)=>
   author.books.includes(req.params.isbn)
    );   

  if(getSpecificAuthors.length===0){
      return  res.json({
          error: `No author found for the book ${req.params.isbn}`
      });
  }

  return  res.json({authors: getSpecificAuthors });
});




 /*
 Route                /publications
 Description          get all publications 
 Access               Public
 Parameters           
 Method               GET
 */
 app.get('/publications', (req, res) => {
     return  res.json({
        publications: database.publications     
     });
 });


 
 /*
 Route                /publications/i
 Description          get specific publication based on id 
 Access               Public
 Parameters           id
 Method               GET
 */

 app.get('/publications/i/:id', (req, res) => {
    const getSpecificpublication= database.publications.filter((publication)=>
    publication.id===parseInt(req.params.id)
     );   
 
   if(getSpecificpublication.length===0){
       return  res.json({
           error: `No publication found for the id ${req.params.id}`
       });
   }
 
   return  res.json({publication: getSpecificpublication });
 });
 
 /*
 Route                /publications/is
 Description          get a list of publication based on book's ISBN
 Access               Public
 Parameters           isbn
 Method               GET
 */
 app.get('/publications/is/:isbn', (req, res) => {
    const getSpecificpublications= database.publications.filter((publication)=>
     publication.books.includes(req.params.isbn)
      );   
  
    if(getSpecificpublications.length===0){
        return  res.json({
            error: `No publication found for the book ${req.params.isbn}`
        });
    }
  
    return  res.json({authors: getSpecificpublications });
  });

  
/*
 Route                /book/new
 Description          add new books
 Access               Public
 Parameters           None
 Method               POST
 */
app.post('/book/new', (req, res) => {
    const {newBook} = req.body;
    database.books.push(newBook);
    return  res.json({books: database.books, message: "book was added"});
});



/*
 Route                /author/new
 Description          add new author
 Access               Public
 Parameters           None
 Method               POST
 */
 app.post('/author/new', (req, res) => {
    const {newauthor} = req.body;
    database.authors.push(newauthor);
    return  res.json({authors: database.authors, message: "author was added"});
});

/*
 Route                /publication/new
 Description          add new publication
 Access               Public
 Parameters           None
 Method               POST
 */
 app.post('/publication/new', (req, res) => {
    const {newpublication} = req.body;
    database.publications.push(newpublication);
    return  res.json({publications: database.publications, message: "publication was added"});
});


/*
 Route                /book/update
 Description          update title of a book
 Access               Public
 Parameters           isbn
 Method               PUT
 */
 app.put('/book/update/:isbn', (req, res) => {
     database.books.forEach((book)=>{
         if(book.ISBN===req.params.isbn){
             book.title=req.body.bookTitle;
             return;
         }
     });
     return  res.json({books: database.books});
 });


/*
 Route                /book/author/update
 Description          update/add new author
 Access               Public
 Parameters           isbn
 Method               PUT
 */
 app.put('/book/author/update/:isbn', (req, res) => {
     
    //update the book database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){   
            return book.authors.push(req.body.newAuthor);
        }
    });

    // update the author database
    database.authors.forEach((author)=>{
        if(author.id===req.body.newAuthor){
            return author.books.push(req.params.isbn);
        }
    });
    return  res.json({
        books:database.books, 
        authors: database.authors, 
        message: "new author was added"});
});



/*
 Route                /author/update
 Description          update author name using id
 Access               Public
 Parameters           id
 Method               PUT
 */
 app.put('/author/update/:id', (req, res) => {
    database.authors.forEach((author)=>{
        if(author.id===parseInt(req.params.id)){
            author.name=req.body.authorName;
            return;
        }
    });
    return  res.json({authors: database.authors});
});



/*
 Route                /publication/update
 Description          update publication name using id
 Access               Public
 Parameters           id
 Method               PUT
 */
 app.put('/publication/update/:id', (req, res) => {
    database.publications.forEach((publication)=>{
        if(publication.id===parseInt(req.params.id)){
            publication.name=req.body.publicationName;
            return;
        }
    });
    return  res.json({publications: database.publications});
});


/*
 Route                /publication/update/book
 Description          update/add new book to a publication
 Access               Public
 Parameters           isbn
 Method               PUT
 */

app.put('/publication/update/book/:isbn', (req, res) => {
    // update the publication database
    database.publications.forEach((publication)=>{
     if(publication.id===req.body.pubId)
      return publication.books.push(req.params.isbn);
    });
    //update the book database
    database.books.forEach((book)=>{
    if(book.ISBN===req.params.isbn){
        book.publication=req.body.pubId;
        return;
    }
    });

    return  res.json({
        books: database.books, 
        publications: database.publications,
        message: "Successfully updated publication"
    });

});









 app.listen(3000, () => {
     console.log(`Server is running`);
 });  