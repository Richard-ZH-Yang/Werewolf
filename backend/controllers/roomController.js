const asyncHandler = require('express-async-handler')
const Room = require('../models/roomModel')

// @desc   get room
// @route  GET /api/rooms/:id
// @access Private
const getRoom = asyncHandler(async (req, res) => {
  const room = await Room.find({ id: req.params.id })
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
  if(!req.body.judgeId) {
    res.status(400)
    throw new Error('Please include the email for the judge')
  }

  // roomId is in 4 digits [1000, 10000)
  let roomId = Math.floor(1000 + Math.random() * 9000)
  let idNotValid = true
  while (idNotValid) {
    if (!(await Room.find({ id: roomId }))) {
      idNotValid = false
    } else {
      roomId = Math.floor(1000 + Math.random() * 9000)
    }
  }

  const room = await Room.create({
    id: roomId,
  })

  res.status(200).json(room)
})

// @desc   delete room
// @route  DELETE /api/rooms/:id
// @access Private
const deleteRoom = asyncHandler(async (req, res) => {
  res.status(200).json({ result: `delete a room` })
})

module.exports = {
  getRoom,
  updateRoom,
  createRoom,
  deleteRoom,
}
