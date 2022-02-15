const express = require('express')
const router = express.Router()
const {
  getPlayers,
  updatePlayer,
  createPlayer,
} = require('../controllers/playerController')

router.route('/:id').put(updatePlayer)
router.route('/').post(createPlayer).get(getPlayers)

module.exports = router
