const asyncHandler = require('express-async-handler')
const Room = require('../models/roomModel')


// @desc   get room
// @route  GET /api/rooms/:id
// @access Private
const getRoom = asyncHandler(async (req, res) => {
  const room = await Room.find({id: req.params.id})
  res.status(200).json(room)
})

// @desc   update room
// @route  PUT /api/rooms/:id
// @access Private
const updateRoom = asyncHandler(async (req, res) => {
   res.status(200).json({ result: `update room ${req.params.id}` })

})

// @desc   create room
// @route  POST /api/rooms
// @access Private
const createRoom = asyncHandler(async (req, res) => {
   res.status(200).json({ result: `create a new room` })

})

// @desc   delete room
// @route  DELETE /api/rooms/:id
// @access Private
const deleteRoom = asyncHandler(async (req, res) => {
  res.status(200).json({ result: `delete a room` })
})

module.exports = {
 getRoom, updateRoom, createRoom, deleteRoom,
}