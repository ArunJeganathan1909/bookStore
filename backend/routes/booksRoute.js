import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();
// Route for Save a new Book
router.post('/', async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'send all required fields: title, auther, publishYear',
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// Get all the books
router.get('/', async (request, response) => {
    try{
        const books = await Book.find({})

        return response.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// Route for getting one book from database by id
router.get('/:id', async (request, response) => {
    try{
        const {id} = request.params;

        const book = await Book.findById(id)

        return response.status(200).json(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// Route for update a book 
router.put('/:id', async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'send all required fields: title, auther, publishYear',
            })
        }

        const {id} = request.params;

        const results = await Book.findByIdAndUpdate(id, request.body);

        if(!results){
            return response.status(404).json({message:`Book not found`});
        }

        return response.status(200).send({message: `Book updated succesfully`})
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// Route for delete one book 
router.delete('/:id', async (request, response) => {
    try{
        const {id} = request.params;

        const results = await Book.findByIdAndDelete(id, request.body);

        if(!results){
            return response.status(404).json({message:`Book not found`});
        }

        return response.status(200).send({message: `Book deleted succesfully`})
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

export default router;

