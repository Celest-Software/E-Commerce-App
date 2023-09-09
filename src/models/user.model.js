import { Model, DataTypes } from 'sequelize';
import sequelize from './database.js';

class User extends Model {}

User.init({
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
  address: DataTypes.STRING,
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'user'
});

export { User };  // This exports the User class you've defined
