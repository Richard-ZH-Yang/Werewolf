import React, { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Card, Button, Alert, Row, Col, Container } from 'react-bootstrap'
import { useAuth, logout } from '../contexts/AuthContext'
// import { useFetch } from './useFetch'
import Player from './Player'
import uuid from 'react-uuid'

export default function MainRoom() {
  const { id } = useParams()
  const url = `http://localhost:4567/rooms/${id}`

  const [error, setError] = useState('')
  const [currentSeat, setCurrentSeat] = useState(0)
    const [loading, setLoading] = useState(true)
    const [room, setRoom] = useState([])
    const [seating, setSeating] = useState([])

  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

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

  async function handleLogout() {
    setError('')

    try {
      await logout()
      navigate('/login', { replace: true })
    } catch {
      setError('Failed to log out')
    }
  }


  return (
    <>
      <Container className='h-100'>
        <Row className='h-100 w-100 align-items-center'>
          {loading ? (
            <Col md={20} className='treeViewComponent h-100'>
              <h1>loading ...</h1>
            </Col>
          ) : (
            seating.map((player, index) => {
              return (
                <Player
                  key={player.id || uuid()}
                  {...player}
                  seatNumber={index + 1}
                  loading={loading}
                  currentSeat={currentSeat}
                  seating={seating}
                />
              )
            })
          )}
        </Row>
      </Container>

      <Button className='btn text-center w-100 mt-2' onClick={handleLogout}>
        Log out
      </Button>
    </>
  )
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
  return { name, id }
}

function getSeating(room) {
  let seatingPlan = []
  const currentSeats = []
  room.players.forEach((player) => {
    currentSeats.push(player.seat)
  })

  for (let i = 1; i <= room.maxNumPlayer; i++) {
    let player = {}
    player = getPlayerInfo(room, i)
    seatingPlan.push({ seatNumber: i, name: player.name, id: player.id })
  }
  return seatingPlan
}
