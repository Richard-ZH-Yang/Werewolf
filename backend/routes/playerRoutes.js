const express = require('express')
const router = express.Router()
const {
  getPlayers,
  getPlayer,
  updatePlayer,
  createPlayer,
  deletePlayer,
} = require('../controllers/playerController')

router.route('/:id').put(updatePlayer).delete(deletePlayer).get(getPlayer)
router.route('/').post(createPlayer).get(getPlayers)

module.exports = router
