import express from 'express';
import { addBook, getBooks, getBookById, updateBook, deleteBook } from '../controllers/book.controller.js';

const router = express.Router();

router.post('/books', addBook);
router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

export default router;
