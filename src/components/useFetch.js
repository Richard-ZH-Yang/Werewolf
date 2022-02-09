import { useState, useEffect, useCallback } from 'react'

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true)
  const [room, setRoom] = useState([])
  const [seating, setSeating] = useState([])

  const getRoom = useCallback(async () => {
    const response = await fetch(url)
    const room = await response.json()
    setRoom(room)
    setSeating(getSeating(room))
    setLoading(false)
  }, [url])

  useEffect(() => {
    getRoom()
  }, [url, getRoom])
  return { loading, room, seating }
}

function getPlayerInfo(room, target) {
    let name = ''
    let id = ''
    room.players.forEach((player) => {
      if (player.seat === target) {
        name = player.name
        id = player.id
      }
    })
    return {name, id}
}

 function getSeating(room){
    let seatingPlan = []
    const currentSeats = []
    room.players.forEach((player)=> {
      currentSeats.push(player.seat)
    })

    for (let i = 1; i <= room.maxNumPlayer; i++ ) {
      let player = {}
      player = getPlayerInfo(room, i)
      seatingPlan.push({seatNumber: i, 
      name: player.name,
      id: player.id })
    }
    return seatingPlan
  }