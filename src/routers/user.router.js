import express from 'express';
import { createUser, getUserById, updateUser, deleteUser, authenticateUser } from '../controllers/user.controller.js';

const router = express.Router();

// Middleware for error handling
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/// Create a new user (Register)
router.post('/register', asyncHandler(async (req, res) => {
    const user = await createUser(req.body);
    // Return only necessary data; avoid exposing sensitive info.
    res.status(201).json({ id: user.id, email: user.email });
}));

// Get a user by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const user = await getUserById(req.params.id);
    // Assuming user contains no sensitive data. If it does, filter it out.
    res.status(200).json(user);
}));

// Update a user
router.put('/:id', asyncHandler(async (req, res) => {
    const user = await updateUser(req.params.id, req.body);
    // Again, assuming no sensitive data. Filter out if necessary.
    res.status(200).json(user);
}));

// Delete a user
router.delete('/:id', asyncHandler(async (req, res) => {
    await deleteUser(req.params.id);
    res.status(204).end();
}));

// Login
router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await authenticateUser(email, password);
    // Send the token and non-sensitive user info.
    res.status(200).json({ token: result.token, user: { id: result.user.id, email: result.user.email } });
}));

// Error handling middleware
router.use((error, req, res, next) => {
    console.error(error.message); // Log the error for debugging.
    if (error.message.includes("Invalid email") || error.message.includes("Invalid Password")) {
        res.status(401).json({ error: "Invalid credentials" }); // Generalize error for security.
    } else {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
