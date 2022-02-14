const getRooms = (req, res) => {
  res.status(200).json({ result: `get room ${req.params.id}` })
}


module.exports = {
 getRooms,
}