const express = require('express')
const router = express.Router()

router.get('/:id', (req, res) => {
 res.status(200).json({result: "get room"})
})

router.post('/:id', (req, res) => {
  res.status(200).json({ result: 'set room' })
})

module.exports = router
