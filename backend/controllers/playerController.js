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
  res.status(200).json({ result: `create a new player` })
})

// @desc   delete player
// @route  DELETE /api/players/:id
// @access Private
const deletePlayer = asyncHandler(async (req, res) => {
  res.status(200).json({ result: `delete a player` })
})

module.exports = {
  getPlayers,
  updatePlayer,
  createPlayer,
  deletePlayer,
}
