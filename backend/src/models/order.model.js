import { Model, DataTypes } from 'sequelize';
import sequelize from './database.js';

// Import the User model (adjust the import path as needed)
import { User } from './user.model.js';

class Order extends Model {}

Order.init(
  {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    totalPrice: DataTypes.FLOAT,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'NEW', // Default status
    },
  },
  {
    sequelize,
    modelName: 'order',
    timestamps: true,
  }
);

export { Order };

// Define the OrderItem and LatLng models
class OrderItem extends Model {}

OrderItem.init(
  {
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'orderItem',
  }
);

export { OrderItem };

class LatLng extends Model {}

LatLng.init(
  {
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'latLng',
  }
);

export { LatLng };

// Define associations
Order.hasMany(OrderItem, { as: 'items', foreignKey: 'orderId' });

// Use the imported User model in the association
Order.belongsTo(User, { foreignKey: 'userId' });
