const asyncHandler = require('express-async-handler')
const Room = require('../models/roomModel')
const { getFourDigitId, generateSeats, isRoomInfoValid } = require('../utilities/roomUtil')
// roomId is in the range of [1000, 10000)
const MAX_NUM_ROOM = 9999 - 1000 + 1

// @desc   get room
// @route  GET /api/rooms/:id
// @access Private
const getRoom = asyncHandler(async (req, res) => {
  const room = await Room.findOne({ id: req.params.id })
  res.status(200).json(room)
})

// @desc   get rooms
// @route  GET /api/rooms
// @access Private
const getRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find()
  res.status(200).json(rooms)
})


// @desc   update a player's seat
// @route  PUT /api/rooms/:id/:userId
// @access Private
const switchSeat = asyncHandler(async (req, res) => {
  res.status(200).json({ result: `update room ${req.params.id}` })
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

  const existingIds = await Room.find().select('id')

  if (existingIds.length === MAX_NUM_ROOM) {
    res.status(404)
    throw new Error('All rooms are occupied')
  }

  let roomId = await getFourDigitId(existingIds)

  const room = await Room.create({
    id: roomId,
    seats: seats,
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
  getRooms,
  updateRoom,
  createRoom,
  deleteRoom,
  switchSeat,
}
