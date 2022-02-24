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

// REQUIRES: the target seats that switched to have no player, if switchInfo.from is not 0, player with id switchInfo.playerId must be present in switchInfo.from
// EFFECTS: if the player does not have seat yet, set the seat switched to with the player information. Otherwise switch the seat that player sit on with the seat switched to, but will not switch the identity
function getRoomAfterSwitch(room, switchInfo) {
  if (switchInfo.from === 0) {
    room.seats[switchInfo.to - 1].player.id = switchInfo.playerId
    room.seats[switchInfo.to - 1].player.name = switchInfo.playerName
  } else {
    const temp = room.seats[switchInfo.to - 1].player
    room.seats[switchInfo.to - 1].player =
      room.seats[switchInfo.from - 1].player
    room.seats[switchInfo.from - 1].player = temp
  }
  return room
}

// EFFECTS: check if the player has seat on other positions other than the position they switch from
function isUserSeatOnOtherPositions(room, switchInfo) {
  let result = false
  room.seats.forEach((seat) => {
    if (seat.player.id === switchInfo.playerId && seat.id !== switchInfo.from) {
      result = true
    }
  })
  return result
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

// EFFECTS: check if the to is in range of [1, numSeatsIncludingJudge], and if the from is in range of [0, numSeatsIncludingJudge], and there are player name and id for switchInfo, and switchInfo.from matches what is present in room
function isSwitchInfoValid(switchInfo, room) {
  const numSeatsIncludingJudge = room.seats.length

  if (switchInfo.from < 0 || switchInfo.from > numSeatsIncludingJudge) {
    return false
  }

  if (switchInfo.to < 1 || switchInfo.to > numSeatsIncludingJudge) {
    return false
  }

  if (!switchInfo.playerId || !switchInfo.playerName) {
    return false
  }

  if (
    switchInfo.from !== 0 &&
    room.seats[switchInfo.from - 1].player.id !== switchInfo.playerId
  ) {
    return false
  }

  return true
}


// EFFECTS: get a array with all the players in the room, each element has the information about a player's id and name
function getPlayerPositions(room) {
  let players = []
  room.seats.forEach((seat) => {
    players.push({
      id: seat.player.id,
      name: seat.player.name
    })
  })

  return players
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
  isSwitchInfoValid,
  getRoomAfterSwitch,
  isUserSeatOnOtherPositions,
  isUpdateInfoValid,
  getPlayerPositions,
}
