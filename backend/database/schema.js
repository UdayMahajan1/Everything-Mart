const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
  orderId: {
    type: Number,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  dealerEmail: {
    type: String,
    required: true
  },
  orderDate: {
    type: String, 
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  itemQuantity: {
    type: Number,
    required: true
  },
  unitPrice: {
    type: Number,
    required: true
  }
})

const Order = model('Order', orderSchema)

module.exports = Order