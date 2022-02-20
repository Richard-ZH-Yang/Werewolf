import React, { useState, useCallback, useEffect } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'

export default function Rules({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Leader Board</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <h1>Hello world</h1>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
