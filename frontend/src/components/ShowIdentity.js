import React, { useState, useEffect } from 'react'
import { Button, Modal, Image } from 'react-bootstrap'
import defaultImage from '../data/images/default.png'
import wolfImage from '../data/images/WOLF.png'
import civilianImage from '../data/images/CIVILIAN.png'
import prophetImage from '../data/images/PROPHET.png'
import witchImage from '../data/images/WITCH.png'
import hunterImage from '../data/images/HUNTER.png'
import idiotImage from '../data/images/IDIOT.png'
import guardianImage from '../data/images/GUARDIAN.png'
import PropTypes from 'prop-types'



export default function ShowIdentity({ show, onHide, seat, displayError }) {
  const [picture, setPicture] = useState(defaultImage)
  const [showIdentity, setShowIdentity] = useState(false)

  useEffect(()=> {
    if (seat.player.identity === 'WOLF') {
      setPicture(wolfImage)
    } else if (seat.player.identity === 'PROPHET') {
      setPicture(prophetImage)
    } else if (seat.player.identity === 'CIVILIAN') {
      setPicture(civilianImage)
    } else if (seat.player.identity === 'WITCH') {
      setPicture(witchImage)
    } else if (seat.player.identity === 'GUARDIAN') {
      setPicture(guardianImage)
    } else if (seat.player.identity === 'HUNTER') {
      setPicture(hunterImage)
    } else if (seat.player.identity === 'IDIOT') {
      setPicture(idiotImage)
    } else {
      displayError('ERROR! Not a valid identity')
      setPicture(defaultImage)
    }
  }, [])


  const handleShowIdentity = () => {
    setShowIdentity(!showIdentity)
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>View my identity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image
          className='rounded mx-auto d-block'
          src={showIdentity ? picture : defaultImage}
          onClick={handleShowIdentity}
        />
        <h2 className='text-center mt-5'>
          {showIdentity
            ? seat.player.identity || 'ERROR'
            : 'Click image to show the identity'}
        </h2>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

ShowIdentity.propTypes = {
  seat: PropTypes.object.isRequired,

}

ShowIdentity.defaultProps = {
  seat: {
    player: {
      identity: 'LOADING'
    }
  }
}