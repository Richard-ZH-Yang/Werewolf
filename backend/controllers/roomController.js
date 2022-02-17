const asyncHandler = require('express-async-handler')
const Room = require('../models/roomModel')
const { getFourDigitId, generateSeats, isRoomInfoValid } = require('../utilities/roomUtil')

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

  const roomInfo = req.body.roomInfo
  
  if (!isRoomInfoValid(roomInfo)) {
    res.status(400)
    throw new Error('The room information is not valid')
  }

  const seats = generateSeats(roomInfo)

  let roomId = await getFourDigitId(Room)

  const room = await Room.create({
    id: roomId,
  })

  // a room with same id was generate simultaneously by others
  if (Room.find({id: roomId}).length !== 1) {
    await room.remove()
    res.status(404)
    throw new Error('Failed to create a room, the id is already taken')
  }

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
