const mongoose = require('mongoose')

const playerSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'Please add an ID for this player'],
    },
    name: {
      type: String,
      required: [true, 'Please add a name for this player'],
    },
    wolfWins: {
      type: number,
      required: [true, 'Please add wolfWins for this player'],
    },
    civilianWins: {
      type: number,
      required: [true, 'Please add civilianWins for this player'],
    },
    prophetWins: {
      type: number,
      required: [true, 'Please add prophetWins for this player'],
    },
    witchWins: {
      type: number,
      required: [true, 'Please add witchWins for this player'],
    },
    hunterWins: {
      type: number,
      required: [true, 'Please add hunterWins for this player'],
    },
    idiotWins: {
      type: number,
      required: [true, 'Please add idiotWins for this player'],
    },
    guardianWins: {
      type: number,
      required: [true, 'Please add guardianWins for this player'],
    },
    totalWins: {
      type: number,
      required: [true, 'Please add totalWins for this player'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Player', playerSchema)
