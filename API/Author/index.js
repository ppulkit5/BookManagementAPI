
const Router = require("express").Router();

const AuthorModel= require("../../database/author");

/*
 Route                /author
 Description          get all authors
 Access               Public
 Parameters           None  
 Method               GET
 */

 Router.get('/', async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return  res.json({authors: getAllAuthors});
});


 /*
 Route                /author/id
 Description          get specific author based on id
 Access               Public
 Parameters           id
 Method               GET
 */
Router.get('/id/:id', async (req, res) => {
    const getSpecificauthor = await AuthorModel.findOne({id : parseInt(req.params.id)});
  
    // const getSpecificauthor=database.authors.filter(
    //     (author)=>author.id===parseInt(req.params.id)
    //     );
    
    if(!getSpecificauthor){
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
Router.get('/:isbn', async (req, res) => {
    
    const getSpecificAuthors = await AuthorModel.findOne({books : req.params.isbn});
  
//     const getSpecificAuthors= database.authors.filter((author)=>
//    author.books.includes(req.params.isbn)
//     );   

  if(!getSpecificAuthors){
      return  res.json({
          error: `No author found for the book ${req.params.isbn}`
      });
  }

  return  res.json({authors: getSpecificAuthors });
});



/*
 Route                /author/new
 Description          add new author
 Access               Public
 Parameters           None
 Method               POST
 */
 Router.post('/new', (req, res) => {

    try{
     
     const {newAuthor} = req.body;

       await AuthorModel.create(newAuthor);
       
     return  res.json({ message: "author was added"});
    }
    catch(error){
        res.json({error : error.message });
      }
});


/*
 Route                /author/update
 Description          update author name using id
 Access               Public
 Parameters           id
 Method               PUT
 */
 Router.put('/update/:id', async (req, res) => {

    
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id : req.params.id
        },
        {
          name : req.body.authorName
        },
        {
            new : true
        }
    ); 

    // database.authors.forEach((author)=>{
    //     if(author.id===parseInt(req.params.id)){
    //         author.name=req.body.authorName;
    //         return;
    //     }
    // });
    return  res.json({authors: updatedAuthor});
});


/*
 Route                /author/delete
 Description          delete an author 
 Access               Public
 Parameters           id
 Method               DELETE
 */
 Router.delete('/delete/:id', async (req, res) => {
    
    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete(
    {
        id : req.params.id
    }
  );

    // const updatedAuthorDatabase=database.authors.filter(
    //     (author)=> author.id !== parseInt(req.params.id)
    // );
    // database.authors=updatedAuthorDatabase;

  return  res.json({authors: updatedAuthorDatabase});  
});

module.exports = Router;