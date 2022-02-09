import React from 'react'
import { Card, Button, Alert, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useAuth, logout } from '../contexts/AuthContext'

export default function Player({ name, seatNumber, loading, currentSeat, seating }) {
  const { currentUser } = useAuth()

  const handleOnclick = (seatNumber) => {
    if (currentSeat === seatNumber) {
      // already seat here
      console.log('NOWAY')

    } else if (seatIsOccupied(seatNumber, seating)) {
      // already occupid
      console.log("OCCUPID")
    } else {
      // success
            console.log('SUCCESS')

    }
  }

  return (
    <>
      <Col className='container-fluid mt-4 treeViewComponent h-100'>
        <Card border='primary' style={{ width: '18 rem', flex: 1 }}>
          <Card.Body className='d-flex flex-column mb-2'>
            <Card.Title as='h2'>{seatNumber}</Card.Title>

            <h4>{name}</h4>
            <Button disabled={loading} onClick={() => handleOnclick(seatNumber)} className='btn mt-auto' variant='info'>
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
  seating.forEach((seat)=> {
    if (seat.seatNumber === seatNumber && seat.name !== '') {
      result = true
    }
  })
  return result
}
