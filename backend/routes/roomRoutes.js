const express = require('express')
const router = express.Router()
const {
  getRoom,
  getRooms,
  updateRoom,
  createRoom,
  deleteRoom,
  switchSeat
} = require('../controllers/roomController')

router.route('/:id/:userId').put(switchSeat)
router.route('/:id').get(getRoom).put(updateRoom).delete(deleteRoom)
router.route('/').post(createRoom).get(getRooms)

module.exports = router
