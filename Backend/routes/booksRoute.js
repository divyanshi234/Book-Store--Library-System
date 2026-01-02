
import express from 'express';
import { Book } from '../models/bookModel.js'
const router = express.Router();

// Route for Save a new Book
router.post('/', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);

    // (You’ll later save this to MongoDB, e.g., using Book.create(newBook))
    return res.status(201).send(book);
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


// Route for Get All Books frm datebase
// Route for Get Book by ID
// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



//Route for Update a book
// Update book by ID
router.put('/:id', async (req, res) => {
  try {
    // Validate required fields
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = req.params;

    // ✅ Correct variable name: req.body
    const result = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // ✅ Correct variable name: res
    return res.status(200).json({
      message: 'Book updated successfully',
      book: result,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});


// Route for Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json({
      message: 'Book deleted successfully'   // ✅ not 'updated'
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


export default router;