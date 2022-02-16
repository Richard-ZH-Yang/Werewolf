const asyncHandler = require('express-async-handler')
const Player = require('../models/playerModel')

// @desc   get players
// @route  GET /api/players
// @access Private
const getPlayers = asyncHandler(async (req, res) => {
  const players = await Player.find()
  res.status(200).json(players)
})

// @desc   update player
// @route  PUT /api/players/:id
// @access Private
const updatePlayer = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id)

  if (!player) {
    res.status(404)
    throw new Error('Player not found')
  }

  const updatedPlayer = await Player.findByIdAndUpdate(
    req.params.id,
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

  const total =
    wolfWins +
    civilianWins +
    prophetWins +
    witchWins +
    hunterWins +
    idiotWins +
    guardianWins +
    totalWins

  if (total !== totalWins) {
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
// @route  DELETE /api/player/:id
// @access Private
const deletePlayer = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id)

  if (!player) {
    res.status(404)
    throw new Error('Player not found')
  }

  await player.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getPlayers,
  updatePlayer,
  createPlayer,
  deletePlayer,
}
