import { Router } from 'express';
import handler from 'express-async-handler';
import auth from '../middleware/authMiddleware.js';
import { BAD_REQUEST } from '../constants/httpStatus.js';
import { Order } from '../models/order.model.js'; // Import the Order model
import { OrderStatus } from '../constants/orderStatus.js';
import { User } from '../models/user.model.js';

const router = Router();
router.use(auth);

router.post(
  '/create',
  handler(async (req, res) => {
    const order = req.body;

    if (order.items.length <= 0) res.status(BAD_REQUEST).send('Cart Is Empty!');

    // Delete the existing order
    await Order.destroy({
      where: {
        user: req.user.id,
        status: OrderStatus.NEW,
      },
    });

    // Create a new order
    const newOrder = await Order.create({ ...order, user: req.user.id });
    res.send(newOrder);
  })
);

router.put(
  '/pay',
  handler(async (req, res) => {
    const { paymentId } = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if (!order) {
      res.status(BAD_REQUEST).send('Order Not Found!');
      return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAID; // Correct the status value
    await order.save();

    res.send(order.id); // Send the ID of the order
  })
);

router.get(
  '/track/:orderId',
  handler(async (req, res) => {
    const { orderId } = req.params;
    const user = await User.findByPk(req.user.id); // Find the user by primary key

    const filter = {
      id: orderId, // Use 'id' instead of '_id'
    };

    if (!user.isAdmin) {
      filter.user = user.id; // Use 'id' instead of '_id'
    }

    const order = await Order.findOne({ where: filter });

    if (!order) return res.status(BAD_REQUEST).send('Order Not Found!');

    return res.send(order);
  })
);

router.get(
  '/newOrderForCurrentUser',
  handler(async (req, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (order) res.send(order);
    else res.status(BAD_REQUEST).send('Order Not Found!');
  })
);

const getNewOrderForCurrentUser = async (req) => {
  const user = await User.findByPk(req.user.id); // Find the user by primary key
  if (user) {
    const order = await Order.findOne({
      where: {
        user: user.id, // Use 'id' instead of '_id'
        status: OrderStatus.NEW,
      },
    });
    return order;
  }
  return null;
};

export default router;
