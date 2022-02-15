const express = require('express')
const router = express.Router()
const {
  getRoom,
  updateRoom,
  createRoom,
  deleteRoom,
} = require('../controllers/roomController')

router.route('/:id').get(getRoom).put(updateRoom).delete(deleteRoom)
router.route('/').post(createRoom)

module.exports = router
