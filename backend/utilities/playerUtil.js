// REQUIRES: there are 7 characters in the playerInfo, namely wolf, civilian, prophet, witch, hunter, idiot, guardian
// EFFECTS: check if the total wins match the wins from other characters
function isTotalWinsValid(playerInfo) {
  const total =
    playerInfo.wolfWins +
    playerInfo.civilianWins +
    playerInfo.prophetWins +
    playerInfo.witchWins +
    playerInfo.hunterWins +
    playerInfo.idiotWins +
    playerInfo.guardianWins

  return total === playerInfo.totalWins ? true : false
}

module.exports = {
 isTotalWinsValid
}