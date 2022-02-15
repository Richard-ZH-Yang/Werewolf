const mongoose = require('mongoose')

const roomSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'Please add an ID for this room'],
    },
    seats: [
      {
        id: {
          type: String,
          required: [true, 'Please add an email address as ID for this player'],
        },
        player: {
          identity: {
            type: String,
            required: [true, 'Please add an identity for this player'],
          },
          name: {
            type: String,
            required: [true, 'Please add a name for this player'],
          },
          seat: {
            type: Number,
            required: [true, 'Please add a seat number for this player'],
          },
          required: false
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Room', roomSchema)