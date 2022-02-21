import React, { useState, useEffect } from 'react'
import { Button, Modal, Image } from 'react-bootstrap'



export default function ShowIdentity({ show, onHide, player, loading }) {
  const [picturePath, setPicturePath] = useState('../data/images/default.png')


  useEffect(() => {
    let pictureName = player.identity

    setPicturePath(`../data/images/${pictureName}.png`)
  })




  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>View my identity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={require(picturePath)} responsive />
        {player.identity || "ERROR"}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>

      </Modal.Footer>
    </Modal>
  )
}

