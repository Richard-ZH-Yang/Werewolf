const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

// app.get('/rooms/:id', (req, res) => {
//  res.json({result: "nice"})
// })

app.use

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
}) 