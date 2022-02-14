const express = require('express')
const router = express.Router()
const {getRooms, updateRooms} = require('../controllers/roomController')

router.get('/:id', getRooms)

router.post('/:id', updateRooms)

module.exports = router
 