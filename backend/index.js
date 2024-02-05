import express, { request, response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose, { get } from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import { Book } from './models/bookModel.js';
import cors from 'cors';

const app = express();

app.use(express.json())

// Middleware for handling CORS Policy 
// Option 1: Allow all origins with Default of cors(*)
app.use(cors());

// Option 2: Allow custom origins

/*
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET','POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type']
    })
)
*/

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome To Book Store')
})

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL).then(() => {
    console.log(`App connected to database`);
    app.listen(PORT, () => {
        console.log(`App is running to port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error)
})