import React from 'react'
import { Card, Button, Alert, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default function Player({ name, seatNumber }) {
  return (
    <>
      <Col
        md={6}
        className='container-fluid mt-4 treeViewComponent h-100'
      >
        <Card border='primary' style={{ width: '18 rem', flex: 1 }}>
          <Card.Body className='d-flex flex-column mb-2'>
            <Card.Title as='h2'>{seatNumber + 1}</Card.Title>

            <h4>{name}</h4>
            <Button className='btn mt-auto' variant='info'>
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
