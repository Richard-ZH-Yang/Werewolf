
// EFFECTS: return a random 4 digit room id that does not exist in the database yet
async function getFourDigitId(Room) {
  let roomId = Math.floor(1000 + Math.random() * 9000)
  let idNotValid = true
  while (idNotValid) {
    if (!(await Room.find({ id: roomId }))) {
      idNotValid = false
    } else {
      roomId = Math.floor(1000 + Math.random() * 9000)
    }
  }
  return roomId
}

// REQUIRES: there are 7 characters in the roomInfo, namely wolf, civilian, prophet, witch, hunter, idiot, guardian
// EFFECTS: get how many players including judge are in this room
function getNumPlayer(roomInfo) {
 return roomInfo.wolf +
 roomInfo.civilian +
 roomInfo.prophet +
 roomInfo.witch + 
 roomInfo.hunter +
 roomInfo.idiot +
 roomInfo.guardian +
 1
}


function generateSeats(roomInfo) {
 let seats = []
for (let i = 1; i <= getNumPlayer(roomInfo); i++) {

}
 return seats
}

// REQUIRES: there are 7 characters in the roomInfo, namely wolf, civilian, prophet, witch, hunter, idiot, guardian
// EFFECTS: return false if judgeId or judgeName is empty, or any character number is smaller than 0. Otherwise is valid
function isRoomInfoValid (roomInfo) {
 if(!roomInfo.judgeId || !roomInfo.judgeName || roomInfo.wolf < 0 || roomInfo.civilian < 0 || roomInfo.prophet < 0 || roomInfo.witch < 0 || roomInfo.hunter < 0 || roomInfo.idiot < 0 || roomInfo.guardian < 0  ) {
  return false
 } else {
  return true
 }
}

module.exports = {
  getFourDigitId, generateSeats, isRoomInfoValid
}
