import React from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default function Player({ name, seatNumber }) {
  return (
    <>
      <Card>
        <Card.Body>
          <h3>{seatNumber + 1}</h3>
          <h4>{name}</h4>
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
