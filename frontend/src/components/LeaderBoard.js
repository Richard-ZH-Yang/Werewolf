import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function LeaderBoard({ show, onHide }) {

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Leader Board</Modal.Title>
      </Modal.Header>
      <Modal.Body>Hello</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
