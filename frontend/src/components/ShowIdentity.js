import React, {useState} from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function ShowIdentity ({show, onHide, player}) {


  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>View my identity</Modal.Title>
      </Modal.Header>
      <Modal.Body>{player.identity || "ERROR" }</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>

      </Modal.Footer>
    </Modal>
  )
}
