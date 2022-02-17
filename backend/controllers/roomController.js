const asyncHandler = require('express-async-handler')
const Room = require('../models/roomModel')
const { getFourDigitId } = require('../utilities/roomUtil')

// @desc   get room
// @route  GET /api/rooms/:id
// @access Private
const getRoom = asyncHandler(async (req, res) => {
  const room = await Room.findOne({ id: req.params.id })
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
  if (!req.body.roomInfo) {
    res.status(400)
    throw new Error('Please include the information for this room')
  }

  let roomId = await getFourDigitId(Room)

  const room = await Room.create({
    id: roomId,
  })

  res.status(200).json(room)
})

// @desc   delete room
// @route  DELETE /api/rooms/:id
// @access Private
const deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findOne({ id: req.params.id })

  if (!room) {
    res.status(404)
    throw new Error(`Room with id ${req.params.id} not found`)
  }

  await room.remove()

  res.status(200).json({ id: req.params.id })
})


module.exports = {
  getRoom,
  updateRoom,
  createRoom,
  deleteRoom,
}
