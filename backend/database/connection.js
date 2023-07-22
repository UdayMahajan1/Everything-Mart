require('dotenv').config()
const mongoose = require('mongoose')

module.exports = async () => {
  try{
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log(err)
  }
}