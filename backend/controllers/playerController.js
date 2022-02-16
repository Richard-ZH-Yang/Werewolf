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
  res.status(200).json({ result: `update player ${req.params.id}` })
})

// @desc   create player
// @route  POST /api/players
// @access Private
const createPlayer = asyncHandler(async (req, res) => {
    if (!req.body.id || !req.body.name) {
      res.status(400)
      throw new Error('Please include an id or name for the player')
    }

    const player = await Player.create({
      id: req.body.id,
      name: req.user.name,
      
    })

    res.status(200).json(goal)
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

res.status(200).json({ id: req.params.id })})

module.exports = {
  getPlayers,
  updatePlayer,
  createPlayer,
  deletePlayer,
}
