const express = require('express')
const router = express.Router()
const {getRoom, updateRoom, createRoom} = require('../controllers/roomController')



router.route('/:id').get(getRoom).put(updateRoom)
router.route('/').post(createRoom)

module.exports = router
 