import React, {useState} from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function ShowIdentity ({show, onHide}) {

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>

      </Modal.Footer>
    </Modal>
  )
}
