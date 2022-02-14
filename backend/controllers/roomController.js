// @desc   get room
// @route  GET /api/rooms/:id
// @access Private
const getRooms = (req, res) => {
  res.status(200).json({ result: `get room ${req.params.id}` })
}

// @desc   update room
// @route  POST /api/rooms/:id
// @access Private
const updateRooms = (req, res) => {
   res.status(200).json({ result: `update room ${req.params.id}` })

}

module.exports = {
 getRooms, updateRooms
}