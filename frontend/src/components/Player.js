import React, { useState } from 'react'
import { Card, Button, Alert, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useAuth, logout } from '../contexts/AuthContext'

export default function Player({
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
        <Card border='primary' style={{ width: '18 rem', flex: 1 }}>      {error && <Alert variant='danger'>{error}</Alert>}

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

Player.propTypes = {
  name: PropTypes.string.isRequired,
}

Player.defaultProps = {
  name: 'no name',
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
