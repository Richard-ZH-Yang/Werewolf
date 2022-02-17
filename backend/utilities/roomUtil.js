// REQUIRES: there are 7 characters in the roomInfo, namely wolf, civilian, prophet, witch, hunter, idiot, guardian
// EFFECTS: generate a random seat plan that places judge at the last position, and fill other positions with a random character, empty id and empty name
function generateSeats(roomInfo) {
  let seats = []
  let pool = getCharactersPool(roomInfo)
  for (let i = 1; i < getNumPlayer(roomInfo); i++) {
    let randomIndex = Math.floor(Math.random() * pool.length)
    seats.push({
      id: i,
      player: {
        identity: pool.splice(randomIndex, 1)[0],
        id: '',
        name: '',
      },
    })
  }
  seats.push({
    id: getNumPlayer(roomInfo),
    player: {
      id: roomInfo.judgeId,
      identity: 'JUDGE',
      name: roomInfo.judgeName,
    },
  })
  return seats
}

// EFFECTS: return a random 4 digit room id that does not exist in the database yet
async function getFourDigitId(existingIds) {
  let roomId = Math.floor(1000 + Math.random() * 9000)
  let idNotValid = true
  while (idNotValid) {
    if (!existingIds.includes(roomId)) {
      idNotValid = false
    } else {
      roomId = Math.floor(1000 + Math.random() * 9000)
    }
  }
  return roomId
}

// REQUIRES: there are 7 characters in the roomInfo, namely wolf, civilian, prophet, witch, hunter, idiot, guardian
// EFFECTS: return false if judgeId or judgeName is empty, or any character number is smaller than 0. Otherwise is valid
function isRoomInfoValid(roomInfo) {
  if (
    !roomInfo.judgeId ||
    !roomInfo.judgeName ||
    roomInfo.wolf < 0 ||
    roomInfo.civilian < 0 ||
    roomInfo.prophet < 0 ||
    roomInfo.witch < 0 ||
    roomInfo.hunter < 0 ||
    roomInfo.idiot < 0 ||
    roomInfo.guardian < 0
  ) {
    return false
  } else {
    return true
  }
}

// REQUIRES: there are 7 characters in the roomInfo, namely wolf, civilian, prophet, witch, hunter, idiot, guardian
// EFFECTS: get how many players including judge are in this room
function getNumPlayer(roomInfo) {
  return (
    roomInfo.wolf +
    roomInfo.civilian +
    roomInfo.prophet +
    roomInfo.witch +
    roomInfo.hunter +
    roomInfo.idiot +
    roomInfo.guardian +
    1
  )
}

// REQUIRES: there are 7 characters in the roomInfo, namely wolf, civilian, prophet, witch, hunter, idiot, guardian
// EFFECTS: get an array with all the characters identity in this room corresponds to their number, with repeat
function getCharactersPool(roomInfo) {
  let result = []
  result.push(...getNewPoolElements('WOLF', roomInfo.wolf))
  result.push(...getNewPoolElements('CIVILIAN', roomInfo.civilian))
  result.push(...getNewPoolElements('PROPHET', roomInfo.prophet))
  result.push(...getNewPoolElements('WITCH', roomInfo.witch))
  result.push(...getNewPoolElements('HUNTER', roomInfo.hunter))
  result.push(...getNewPoolElements('IDIOT', roomInfo.idiot))
  result.push(...getNewPoolElements('GUARDIAN', roomInfo.guardian))

  return result
}


// EFFECTS: get an array that has the same identity string, with recurrences of the repeat number
function getNewPoolElements(identity, repeat) {
  const newElements = []
  for (let i = 0; i < repeat; i++) {
    newElements.push(identity)
  }
  return newElements
}

module.exports = {
  getFourDigitId,
  generateSeats,
  isRoomInfoValid,
}
