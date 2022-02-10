import React, { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Card, Button, Alert, Row, Col, Container } from 'react-bootstrap'
import { useAuth, logout } from '../contexts/AuthContext'
// import { useFetch } from './useFetch'
// import Player from './Player'
import uuid from 'react-uuid'
import PropTypes from 'prop-types'


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

  function handleRefresh() {
    console.log("YES")
    getRoom()
  }

  return (
    <>
      <Container className='h-100'>
        {error && <Alert variant='danger'>{error}</Alert>}
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
      <Button
        disabled={loading}
        className='btn text-center w-100 mt-2'
        onClick={handleRefresh}
      >
        Refresh
      </Button>
      <Button
        disabled={loading}
        className='btn text-center w-100 mt-2'
        onClick={handleLogout}
      >
        Log out
      </Button>
    </>
  )
}

// custome hooks
function getPlayerInfo(room, target) {
  let name = ''
  let id = ''
  let identity = ''
  room.players.forEach((player) => {
    if (player.seat === target) {
      name = player.name
      id = player.id
      identity = player.identity
    }
  })
  return { name, id, identity}
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
    seatingPlan.push({ seatNumber: i, name: player.name, id: player.id, identity: player.identity })
  }
  return seatingPlan
}



// Player component
function Player({
  name,
  seatNumber,
  loading,
  currentSeat,
  seating,
}) {
  const { currentUser } = useAuth()
  const [error, setError] = useState('')

  const displayError = (message) => {
    setError(message)
    setTimeout(() => {
      setError('')
    }, 2000)
  }

  const handleOnclick = (seatNumber) => {
    currentSeat = 3
    if (currentSeat === seatNumber) {
      // already seat here
      displayError('You already here')
    } else if (seatIsOccupied(seatNumber, seating)) {
      // already occupied
      displayError('It\'s occupied')
    } else {
      // success, also need to check with the backend
      // TODO: communicate with backend, if failed, let user refresh the page

      
    }
  }

  return (
    <>
      <Col className='container-fluid mt-4 treeViewComponent h-100'>
        <Card border='primary' style={{ width: '18 rem', flex: 1 }}>      

          <Card.Body className='d-flex flex-column mb-2'>
            <Card.Title as='h2'>{seatNumber}</Card.Title>

            <h4>{name}</h4>
            <Button
              disabled={loading}
              onClick={() => handleOnclick(seatNumber)}
              className='btn mt-auto'
              variant='info'
            >
              Sit
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}

// Player.propTypes = {
//   name: PropTypes.string.isRequired,
// }

// Player.defaultProps = {
//   name: 'no name',
// }

function seatIsOccupied(seatNumber, seating) {
  let result = false
  seating.forEach((seat) => {
    if (seat.seatNumber === seatNumber && seat.name !== '') {
      result = true
    }
  })
  return result
}
