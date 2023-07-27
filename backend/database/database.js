require('dotenv').config()
const mongoose = require('mongoose')
const c2j = require('csv-file-to-json')
const Order = require('./schema')
const path = require('path')

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log(err)
  }
}

const addOrders = async (fileName, currentuseremail) => {
  const filePath = path.join(__dirname, `../uploads/${fileName}`)
  const orderData = c2j({ filePath: filePath });
  const orders = orderData.map(order => {
    return new Order({
      orderId: parseInt(order['Order ID']),
      customerName: order.Customer,
      dealerEmail: currentuseremail,
      orderDate: order['Order Date'],
      itemName: order['Item Name'],
      itemQuantity: parseInt(order.Quantity),
      unitPrice: parseFloat(order['Unit Price'])
    }
    )
  })
  try {
    await Order.insertMany(orders)
    return orders
  }
  catch (err) {
    console.log(err)
  }
}

const getOrders = async (currentuseremail) => {
  try {
    const orders = await Order.find({ dealerEmail: currentuseremail })
    return orders
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  connect,
  addOrders,
  getOrders,
}