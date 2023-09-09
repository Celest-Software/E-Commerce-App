import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import userRouter from './routers/user.router.js';
import orderRouter from './routers/order.router.js';
import bookRouter from './routers/book.router.js';
import { dbconnect } from './config/database.config.js';

// Derive __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv with the correct path
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Load JWT_SECRET from environment variables or use a default value
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin to access the server
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // This allows the session cookie to be sent and received cross-origin
  optionsSuccessStatus: 204, // Some legacy browsers (e.g., IE11) choke on a 204 status
};

app.use(cors(corsOptions));
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/books', bookRouter);

app.use('*', (req, res) => {
  console.log(`Received request to Test: ${req.method} ${req.originalUrl}`);
  res.status(404).send('Not Found');
});

const PORT = process.env.PORT || 5000; // Use the PORT from environment variables if available
app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
