import { Book } from '../models/book.model.js'; // Assuming you have a book model

// CREATE: Add a book
export const addBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// READ: Get all books
export const getBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// READ: Get a book by ID
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ error: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE: Update a book by ID
export const updateBook = async (req, res) => {
    try {
        await Book.update(req.body, { where: { id: req.params.id } });
        const updatedBook = await Book.findByPk(req.params.id);
        if (updatedBook) {
            res.status(200).json(updatedBook);
        } else {
            res.status(404).json({ error: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE: Delete a book by ID
export const deleteBook = async (req, res) => {
    try {
        const result = await Book.destroy({ where: { id: req.params.id } });
        if (result) {
            res.status(204).json({ message: "Book deleted successfully" });
        } else {
            res.status(404).json({ error: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
