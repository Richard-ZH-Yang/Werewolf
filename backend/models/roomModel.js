const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const roomSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, 'Please add an ID for this room'],
      unique: [true, 'Room id must be unique']
    },
    seats: [
      {
        id: {
          type: Number,
          required: [true, 'Please add a seat number'],
        },
        player: {
          type: {
            id: {
              type: String,
              required: [false, 'Please add an email as ID for this player'],
            },
            identity: {
              type: String,
              required: [true, 'Please add an identity for this player'],
            },
            name: {
              type: String,
              required: [false, 'Please add a name for this player'],
            },
          },
          required: [true, 'Please add a player for this seat'],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

roomSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Room', roomSchema)
