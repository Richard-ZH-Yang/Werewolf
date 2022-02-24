const express = require('express')
const router = express.Router()
const {
  getRoom,
  getRooms,
  resetRoom,
  createRoom,
  deleteRoom,
  switchSeat,
} = require('../controllers/roomController')

router.route('/:id/:userId').put(switchSeat)
router.route('/:id').get(getRoom).put(resetRoom).delete(deleteRoom)
router.route('/').post(createRoom).get(getRooms)

module.exports = router
