
const Router = require("express").Router();

const PublicationModel = require("../../database/publication");

 /*
 Route                /publication
 Description          get all publications 
 Access               Public
 Parameters           
 Method               GET
 */
 Router.get('/', async (req, res) => {
     const getAllPublications = await PublicationModel.find();
     return  res.json({
        publications: getAllPublications    
     });
 });

  
 /*
 Route                /publication/i
 Description          get specific publication based on id 
 Access               Public
 Parameters           id
 Method               GET
 */

 Router.get('/i/:id', async (req, res) => {
  
    const getSpecificpublication =await PublicationModel.findOne({id : parseInt(req.params.id)});

    // const getSpecificpublication= database.publications.filter((publication)=>
    // publication.id===parseInt(req.params.id)
    //  );   
 
   if(!getSpecificpublication){
       return  res.json({
           error: `No publication found for the id ${req.params.id}`
       });
   }
 
   return  res.json({publication: getSpecificpublication });
 });

  
 /*
 Route                /publication/is
 Description          get a list of publication based on book's ISBN
 Access               Public
 Parameters           isbn
 Method               GET
 */
 Router.get('/is/:isbn', async (req, res) => {
    
    const getSpecificpublications = PublicationModel.findOne({books: req.params.isbn});
    
    // const getSpecificpublications= database.publications.filter((publication)=>
    //  publication.books.includes(req.params.isbn)
    //   );   
  
    if(!getSpecificpublications){
        return  res.json({
            error: `No publication found for the book ${req.params.isbn}`
        });
    }
  
    return  res.json({authors: getSpecificpublications });
  });

  

/*
 Route                /publication/new
 Description          add new publication
 Access               Public
 Parameters           None
 Method               POST
 */
 Router.post('/new',async (req, res) => {
    const {newPublication} = req.body;
     
    PublicationModel.create(newPublication);

    return  res.json({ message: "publication was added"});
});

/*
 Route                /publication/update
 Description          update publication name using id
 Access               Public
 Parameters           id
 Method               PUT
 */
 Router.put('/update/:id', async (req, res) => {
    
     
    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
            id : req.params.id
        },
        {
         name : req.body.publicationName
        },
        {
            new : true
        }
    ); 

    // database.publications.forEach((publication)=>{
    //     if(publication.id===parseInt(req.params.id)){
    //         publication.name=req.body.publicationName;
    //         return;
    //     }
    // });

    return  res.json({publications: updatedPublication});
});


/*
 Route                /publication/update/book
 Description          update/add new book to a publication
 Access               Public
 Parameters           isbn
 Method               PUT
 */

 Router.put('/update/book/:isbn', async (req, res) => {

    // update the publication database
   
    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
            id : req.body.pubId
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


    // database.publications.forEach((publication)=>{
    //  if(publication.id===req.body.pubId)
    //   return publication.books.push(req.params.isbn);
    // });

    //update the book database
    
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN : req.params.isbn
        },
        {
         $addToSet : {
             publications : req.body.pubId
         }
        },
        {
         new : true
        }
      );

    // database.books.forEach((book)=>{
    // if(book.ISBN===req.params.isbn){
    //     book.publication=req.body.pubId;
    //     return;
    // }
    // });

    return  res.json({
        books: updatedBook, 
        publications: updatedPublication,
        message: "Successfully updated publication"
    });

});


/*
 Route                /publication/delete
 Description          delete a publication 
 Access               Public
 Parameters           pubId
 Method               DELETE
 */
 Router.delete('/delete/:pubId', async (req, res) => {
    
    const updatedPublicationDatabase = await PublicationModel.findOneAndDelete(
        {
            id : parseInt(req.params.pubId)
        }
    );

    // const updatedPublicationDatabase=database.publications.filter(
    //     (publication)=> publication.id !== parseInt(req.params.pubId)
    // );
    // database.publications=updatedPublicationDatabase;

  return  res.json({publication: updatedPublicationDatabase});  
});


module.exports = Router;