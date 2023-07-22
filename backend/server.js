const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const upload = multer({ dest: 'uploads/'})
const connect = require('./database/connection')
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
connect()

app.post('/', upload.single('file'), (req, res) => {
  console.log(req.headers)
})

app.listen(port, () => console.log(`Server running on port ${port}!`))