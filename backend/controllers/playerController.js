const asyncHandler = require('express-async-handler')
const Player = require('../models/playerModel')

// @desc   get players
// @route  GET /api/players
// @access Private
const getPlayers = asyncHandler(async (req, res) => {
  const players = await Player.find()
  res.status(200).json(players)
})


// @desc   get player
// @route  GET /api/players/:id
// @access Private
const getPlayer = asyncHandler(async (req, res) => {
  const player = await Player.findOne({ id: req.params.id })
  res.status(200).json(player)
})


// @desc   update player
// @route  PUT /api/players/:id
// @access Private
const updatePlayer = asyncHandler(async (req, res) => {
  const player = await Player.findOne({ id: req.params.id })

  if (!player) {
    res.status(404)
    throw new Error(`Player with id ${req.params.id} not found`)
  }

  if (!isTotalWinsValid(req.body.playerInfo)) {
    res.status(400)
    throw new Error('The total wins does not match up')
  }

  const updatedPlayer = await Player.findByIdAndUpdate(
    player._id,
    req.body.playerInfo,
    {
      new: true,
    }
  )

  res.status(200).json(updatedPlayer)
})


// @desc   create player
// @route  POST /api/players
// @access Private
const createPlayer = asyncHandler(async (req, res) => {
  if (!req.body.playerInfo) {
    res.status(400)
    throw new Error('Please include the playerInfo')
  }

  const {
    id,
    name,
    wolfWins,
    civilianWins,
    prophetWins,
    witchWins,
    hunterWins,
    idiotWins,
    guardianWins,
    totalWins,
  } = req.body.playerInfo

  const imaginaryPlayer = await Player.findOne({ id: id })
  if (imaginaryPlayer) {
    res.status(404)
    throw new Error('That player with the same id (email) has been registered')
  }

  if (!isTotalWinsValid(req.body.playerInfo)) {
    res.status(400)
    throw new Error('The total wins does not match up')
  }

  const player = await Player.create({
    id: id,
    name: name,
    wolfWins: wolfWins,
    civilianWins: civilianWins,
    prophetWins: prophetWins,
    witchWins: witchWins,
    hunterWins: hunterWins,
    idiotWins: idiotWins,
    guardianWins: guardianWins,
    totalWins: totalWins,
  })

  res.status(200).json(player)
})


// @desc   delete player
// @route  DELETE /api/players/:id
// @access Private
const deletePlayer = asyncHandler(async (req, res) => {
  const player = await Player.findOne({ id: req.params.id })

  if (!player) {
    res.status(404)
    throw new Error(`Player with id ${req.params.id} not found`)
  }

  await player.remove()

  res.status(200).json({ id: req.params.id })
})


// REQUIRES: there are 7 characters in the playerInfo, namely wolf, civilian, prophet, witch, hunter, idiot, guardian
// EFFECTS: check if the total wins match the wins from other characters
function isTotalWinsValid(playerInfo) {
  const total =
    playerInfo.wolfWins +
    playerInfo.civilianWins +
    playerInfo.prophetWins +
    playerInfo.witchWins +
    playerInfo.hunterWins +
    playerInfo.idiotWins +
    playerInfo.guardianWins

  return total === playerInfo.totalWins ? true : false
}


module.exports = {
  getPlayers,
  getPlayer,
  updatePlayer,
  createPlayer,
  deletePlayer,
}
