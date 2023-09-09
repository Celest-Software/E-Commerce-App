import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Only use the environment variable for JWT secret. No hard-coded fallback.
const JWT_SECRET = process.env.JWT_SECRET;

export const createUser = async (userData) => {
    try {
        // Hash the user's password before storing it in the database
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
        
        const user = await User.create(userData);
        return user;
    } catch (error) {
        throw new Error("Error creating user: " + error.message);
    }
};

export const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        return user;
    } catch (error) {
        throw new Error("Error fetching user by ID: " + error.message);
    }
};

export const updateUser = async (id, updateData) => {
    try {
        await User.update(updateData, { where: { id: id } });
        return getUserById(id);
    } catch (error) {
        throw new Error("Error updating user: " + error.message);
    }
};

export const deleteUser = async (id) => {
    try {
        const result = await User.destroy({ where: { id: id } });
        return result;
    } catch (error) {
        throw new Error("Error deleting user: " + error.message);
    }
};

export const authenticateUser = async (email, password) => {
    try {
      const user = await User.findOne({ where: { email: email.toLowerCase() } }); // Case-insensitive email matching
      if (!user) {
        throw new Error('Invalid email or password');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password'); // Use a generic error message for security reasons
      }
  
      // Generate and return the JWT token
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
      return { user, token };
    } catch (error) {
      throw new Error("Authentication error: " + error.message);
    }
};
