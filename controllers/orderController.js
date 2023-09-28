const Order = require('../models/orderModel');

// Controller function to create a new order
async function createOrder(req, res) {
  const {_id} = req.user
  console.log(req.body)
  try {
    const {
      bookIDs,
      shippingDetails,
      totalPrice,
    } = req.body;

    const order = new Order({
      userID:_id,
      bookIDs,
      shippingDetails,
      totalPrice,
    });

   await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ error: 'Error creating order' });
  }
}

module.exports = {
  createOrder,
};
