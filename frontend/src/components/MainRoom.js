import React, { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Card, Button, Alert, Row, Col, Container } from 'react-bootstrap'
import { useAuth, logout } from '../contexts/AuthContext'
import ShowIdentity from './ShowIdentity'
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
  const [seating, setSeating] = useState([])
  const [showIdentity, setShowIdentity] = useState(false)

  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const getRoom = useCallback(async () => {
    const response = await fetch(url)
    const room = await response.json()
    let seating = room.seats

    // sort the seat number in ascending order
    seating.sort((a, b)=> {
      return a.id - b.id
    })

    setSeating(seating)
    setLoading(false)
  }, [url])

  const displayError = (message) => {
    setError(message)
    setTimeout(() => {
      setError('')
    }, 2000)
  }

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
    getRoom()
  }

  async function handleChangeSeat(seatNumber) {
    if (currentSeat === seatNumber) {
      // already seat here
      displayError('You already here')
    } else if (seatIsOccupied(seatNumber, seating)) {
      // already occupied
      displayError("It's occupied")
    } else {
      // success, also need to check with the backend
      // TODO: communicate with backend, if failed, let user refresh the page

      const plan = {
        currentRoomId: id,
        currentUserId: currentUser.email,
        currentSeat: currentSeat,
        targetSeat: seatNumber,
      }

      const res = await fetch('http://localhost:4567/seat', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(plan),
      })

      if (res.status === 404) {
        // ERROR
      } else {
        // success
        setCurrentSeat(seatNumber)
        handleRefresh()
      }
    }
  }

  function handleViewIdentity() {
    if (currentSeat === 0) {
      displayError('Please select a seat first')
    } else {
      setShowIdentity(true)
    }
  }

  function handleCloseViewIdentity() {
    if (currentSeat === 0) {
      displayError('Please select a seat first')
    } else {
      setShowIdentity(false)
    }
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
            seating.map((seat) => {
              let seatNumber = seat.id
              return (
                <Col
                  key={seat.player.id || uuid()}
                  className='container-fluid mt-4 treeViewComponent h-100'
                >
                  <Card border='primary' style={{ width: '18 rem', flex: 1 }}>
                    <Card.Body className='d-flex flex-column mb-2'>
                      <Card.Title as='h2'>{seatNumber}</Card.Title>

                      <h4>{seat.player.name}</h4>
                      <Button
                        disabled={loading}
                        onClick={() => handleChangeSeat(seatNumber)}
                        className='btn mt-auto'
                        variant='info'
                      >
                        Sit
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
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
        onClick={handleViewIdentity}
      >
        View my identity
      </Button>
      <Button
        disabled={loading}
        className='btn text-center w-100 mt-2'
        onClick={handleLogout}
      >
        Log out
      </Button>

      {loading ? (
          <h1>loading ...</h1>
      ) : (
        <ShowIdentity
          show={showIdentity}
          onHide={handleCloseViewIdentity}
          player={currentSeat === 0? {} : seating[currentSeat - 1]}
        />
      )}
    </>
  )
}




function seatIsOccupied(seatNumber, seating) {
  let result = false
  seating.forEach((seat) => {
    if (seat.seatNumber === seatNumber && seat.name !== '') {
      result = true
    }
  })
  return result
}
