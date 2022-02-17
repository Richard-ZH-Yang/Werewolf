const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const playerSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'Please add an ID for this player'],
      unique: [true, 'Player\s id (email) must be unique'],
    },
    name: {
      type: String,
      required: [true, 'Please add a name for this player'],
    },
    wolfWins: {
      type: Number,
      required: [true, 'Please add wolfWins for this player'],
    },
    civilianWins: {
      type: Number,
      required: [true, 'Please add civilianWins for this player'],
    },
    prophetWins: {
      type: Number,
      required: [true, 'Please add prophetWins for this player'],
    },
    witchWins: {
      type: Number,
      required: [true, 'Please add witchWins for this player'],
    },
    hunterWins: {
      type: Number,
      required: [true, 'Please add hunterWins for this player'],
    },
    idiotWins: {
      type: Number,
      required: [true, 'Please add idiotWins for this player'],
    },
    guardianWins: {
      type: Number,
      required: [true, 'Please add guardianWins for this player'],
    },
    totalWins: {
      type: Number,
      required: [true, 'Please add totalWins for this player'],
    },
  },
  {
    timestamps: true,
  }
)

playerSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Player', playerSchema)
