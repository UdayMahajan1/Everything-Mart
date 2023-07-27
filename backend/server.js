const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const date = new Date()
const fileName = date.toISOString().slice(0, 10) + '.csv'
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, fileName)
  }
})
const upload = multer({ storage: storage })
const {
  connect,
  addOrders,
  getOrders
} = require('./database/database')
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
connect()

app.post('/newOrders', upload.single('file'), async (req, res) => {
  const { currentuseremail } = req.headers
  try {
    const orders = await addOrders(fileName, currentuseremail)
    fs.unlink(`./uploads/${fileName}`, (err) => {
      if (err) throw err;
    })
    res.send(orders)
  } catch (err) {
    console.log(err)
  }
})

app.get('/pastOrders', async (req, res) => {
  const { currentuseremail } = req.headers
  try {
    const orders = await getOrders(currentuseremail)
    res.send(orders)
  } catch (err) { console.log(err) }
})

app.listen(port, () => console.log(`Server running on port ${port}!`))