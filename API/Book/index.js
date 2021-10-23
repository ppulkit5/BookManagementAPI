
// Prefix : /book

// intitializing express router 
const Router = require('express').Router();

// Database Models
const BookModel = require("../../database/book");

 /*
 Route                /
 Description          get all books
 Access               Public
 Parameters           none  
 Method               GET
 */
 Router.get('/', async (req, res) => {
    const getAllBooks = await BookModel.find();
    return  res.json(getAllBooks);
});

 /*
 Route                /is
 Description          get specific book based on isbn
 Access               Public
 Parameters           isbn 
 Method               GET
 */
 Router.get('/is/:isbn', async (req, res) => {
    const getSpecificBook =await BookModel.findOne({ISBN: req.params.isbn});

    // const getSpecificBook=database.books.filter(
    //      (book)=>book.ISBN===req.params.isbn
    //      );
     
     if(!getSpecificBook){
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
Router.get('/c/:category', async (req, res) => {

    const getSpecificBooks= await BookModel.findOne({category : req.params.category});

    // const getSpecificBooks=database.books.filter(
    //     (book)=>book.category.includes(req.params.category)
    //     );
    
    if(!getSpecificBooks){
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

 Router.get('/a/:author',async (req, res) => {
     
    const getSpecificBooks= AuthorModel.findOne({name : req.params.author });
  
    // const getSpecificBooks=database.authors.filter(
    //     (author)=>author.name===req.params.author
    //     );
    
    if(!getSpecificBooks){
     return  res.json({
         error:`No book found for author of ${req.params.author}`
       }); 
    }

    return  res.json({book: getSpecificBooks});
 });
 
 /*
 Route                /book/new
 Description          add new books
 Access               Public
 Parameters           None
 Method               POST
 */
Router.post('/new', async (req, res) => {
    
    try{
    const {newBook} = req.body;

     await BookModel.create(newBook);

    return  res.json({ message: "book was added"}); 
    }
    catch(error){
      res.json({error : error.message });
    }

});

/*
 Route                /book/update
 Description          update title of a book
 Access               Public
 Parameters           isbn
 Method               PUT
 */
 Router.put('/update/:isbn', async (req, res) => {
      
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN : req.params.isbn
        },
        {
        title : req.body.bookTitle
        },
        {
            new : true
        }
    ); 

    //  database.books.forEach((book)=>{
    //      if(book.ISBN===req.params.isbn){
    //          book.title=req.body.bookTitle;
    //          return;
    //      }
    //  });

     return  res.json({books: updatedBook});
 });

 /*
 Route                /book/author/update
 Description          update/add new author
 Access               Public
 Parameters           isbn
 Method               PUT
 */
 Router.put('/author/update/:isbn', async (req, res) => {
     
    //update the book database
     
     const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN : req.params.isbn
        },
        {
         $addToSet : {
             authors : req.body.newAuthor
         }
        },
        {
         new : true
        }
      );


    // database.books.forEach((book)=>{
    //     if(book.ISBN===req.params.isbn){   
    //         return book.authors.push(req.body.newAuthor);
    //     }
    // });

    // update the author database
    
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id : req.body.newAuthor
        },
        {
         $addToSet : {
             books : req.params.isbn
         }
        },
        {
         new : true
        }
      );

    // database.authors.forEach((author)=>{
    //     if(author.id===req.body.newAuthor){
    //         return author.books.push(req.params.isbn);
    //     }
    // });
    return  res.json({
        books:updatedBook, 
        authors: updatedAuthor, 
        message: "new author was added"});
});


 /*
 Route                /book/delete
 Description          delete a book
 Access               Public
 Parameters           isbn
 Method               DELETE
 */
Router.delete('/delete/:isbn', async (req, res) => {

    const updatedBookDatabase = await BookModel.findOneAndDelete({ ISBN : req.params.isbn})

    // const updatedBookDatabase=database.books.filter(
    //     (book)=> book.ISBN !== req.params.isbn
    // );
    // database.books=updatedBookDatabase;

  return  res.json({books: updatedBookDatabase});  
});


/*
 Route                /book/delete/author
 Description          delete a author from a book 
 Access               Public
 Parameters           isbn, authorId
 Method               DELETE
 */

 Router.delete('/delete/author/:isbn/:authorId', async (req, res) => {
    //update book dataabase
 
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN : req.params.isbn
    },
    {
      $pull : {
         authors : parseInt(req.params.authorId)
     } 
    },
    {
        new : true
    });
 
 //    database.books.forEach((book)=>{
 //        if(book.ISBN===req.params.isbn){
 //            const newAuthorList=book.authors.filter(
 //                (author)=> author !== parseInt(req.params.authorId)
 //            ); 
 //            book.authors=newAuthorList;
 //            return;
 //        }
 //    }); 
 
    //update the author database
     
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
     {
         id : parseInt(req.params.authorId)
     },
     {
      $pull : {
         books : req.params.isbn
         } 
     },
     {
       new : true 
     }
   );
 
 //    database.authors.forEach((author)=>{
 //     if(author.id === parseInt(req.params.authorId)){
 //         const newBookList= author.books.filter(
 //             (book) => book !== req.params.isbn
 //         );
 //         author.books=newBookList;
 //        return;
 //     }
 //    });
    return  res.json({
        book: updatedBook, 
        author: updatedAuthor,
        message: "Author was deleted"
     });
 });
 
/*
 Route                /publiction/delete/book
 Description          delete a book from publication 
 Access               Public
 Parameters           isbn,pubId
 Method               DELETE
 */
 Router.delete('/publiction/delete/book/:isbn/:pubId', async (req, res) => {
    
    // update publication database
    
   const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
          id : parseInt(req.params.pubId)
        },
        {
            $pull : {
                books : req.params.isbn
            } 
        },
        {
            new : true
        }
    );

    // database.publications.forEach((publication) => {
    //     if(publication.id === parseInt(req.params.pubId)){
    //         const newBookList= publication.books.filter(
    //             (book) => book !== req.params.isbn
    //         );
    //         publication.books=newBookList;
    //        return;
    //     }
    // });
    
    //update book database

    const updatedBook = await BookModel.findOneAndUpdate(
        {
          ISBN : req.params.isbn
        },
        {
            $set : {
                publication : 0
            } 
        },
        {
            new : true
        }
    );

    // database.books.forEach((book) => {
    //  if(book.ISBN === req.params.isbn){
    //      book.publication=0;  // no book available
    //      return;
    //  }
    // });
    return  res.json({books: updatedBook, publications: updatedPublication});
});

module.exports = Router;