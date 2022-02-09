import React from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default function Player({ name, seatNumber }) {
  return (
    <>
      <Card border='primary' style={{ width: '18 rem', flex: 1 }}>
        <Card.Body className='d-flex flex-column mb-2'>
          <Card.Title as='h2'>{seatNumber + 1}</Card.Title>

          <h4>{name}</h4>
          <Button className='btn mt-auto' variant='info'>
            Go somewhere
          </Button>
        </Card.Body>
      </Card>
    </>
  )
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
}

Player.defaultProps = {
  name: 'no name',
}
