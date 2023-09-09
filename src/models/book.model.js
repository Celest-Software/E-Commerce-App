import { Model, DataTypes } from 'sequelize';
import sequelize from './database.js';

class Book extends Model {}

Book.init({
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.FLOAT,
  imageUrl: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'book'
});

export { Book };
