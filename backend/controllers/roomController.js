const asyncHandler = require('express-async-handler')
const Room = require('../models/roomModel')


// @desc   get room
// @route  GET /api/rooms/:id
// @access Private
const getRoom = asyncHandler((req, res) => {
  res.status(200).json({ result: `get room ${req.params.id}` })
})

// @desc   update room
// @route  PUT /api/rooms/:id
// @access Private
const updateRoom = asyncHandler((req, res) => {
   res.status(200).json({ result: `update room ${req.params.id}` })

})

// @desc   create room
// @route  POST /api/rooms
// @access Private
const createRoom = asyncHandler((req, res) => {
   res.status(200).json({ result: `create a new room` })

})

module.exports = {
 getRoom, updateRoom, createRoom,
}