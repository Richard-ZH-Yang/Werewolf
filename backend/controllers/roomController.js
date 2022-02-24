const asyncHandler = require('express-async-handler')
const Room = require('../models/roomModel')
const {
  getFourDigitId,
  generateSeats,
  isRoomInfoValid,
  isSwitchInfoValid,
  getRoomAfterSwitch,
  getPlayerPositions,
  isUserSeatOnOtherPositions,
} = require('../utilities/roomUtil')
// roomId is in the range of [1000, 10000)
const MAX_NUM_ROOM = 9999 - 1000 + 1

// @desc   get room
// @route  GET /api/rooms/:id
// @access Private
const getRoom = asyncHandler(async (req, res) => {
  const room = await Room.findOne({ id: req.params.id })
  if (!room) {
    res.status(404)
    throw new Error("That room does not exist")
  }
  res.status(200).json(room)
})

// @desc   get rooms
// @route  GET /api/rooms
// @access Private
const getRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find()
  res.status(200).json(rooms)
})


// @desc   update a player's seat, will throw an error if the target seat have been occupied, or the user with the same id 
//         has  seat on positions other than where user is switched from
// @route  PUT /api/rooms/:id/:userId
// @access Private
const switchSeat = asyncHandler(async (req, res) => {

  const switchInfo = {
    from: req.body.from,
    to: req.body.to,
    playerId: req.params.userId,
    playerName: req.body.name
  }
  const room = await Room.findOne({id : req.params.id})

  if (!isSwitchInfoValid(switchInfo, room)) {
    res.status(400)
    throw new Error('The switchInfo is not valid')
  }

  if (!room) {
    res.status(404)
    throw new Error (`Room with id ${req.params.id} not found`)
  }

  if(isUserSeatOnOtherPositions(room, switchInfo)) {
    res.status(400)
    throw new Error('User has seat on positions other than where they are from')
  }

  if (room.seats[switchInfo.to - 1].player.id) {
    res.status(404)
    throw new Error ('Someone has already sit there, please refresh the page and try another seat')
  }

  const newRoom = getRoomAfterSwitch(room, switchInfo)

  const updatedRoom = await Room.findByIdAndUpdate(room._id, newRoom, {
    new: true,
  })

  res.status(200).json( updatedRoom )
})

// @desc   reset all the identities except judge in this room
// @route  PUT /api/rooms/:id
// @access Private
const resetRoom = asyncHandler(async (req, res) => {

  const room = await Room.findOne({ id: req.params.id })
  const playerPositions = getPlayerPositions(room)


  res.status(200).json({ result: `update room ${req.params.id}` })
})

// @desc   create a room with random 4 digit room id, let the room creator be the judge and seat on the last position
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
  resetRoom,
  createRoom,
  deleteRoom,
  switchSeat,
}
