const express = require('express')
const router = express.Router()
const {getRooms} = require('../controllers/roomController')

router.get('/:id', getRooms)

router.post('/:id', (req, res) => {
  res.status(200).json({ result: 'set room' })
})

module.exports = router
 