import React, { useState, useCallback, useEffect } from 'react'
import { Button, Modal, ListGroup, Badge } from 'react-bootstrap'

export default function LeaderBoard({ show, onHide, leaderBoard }) {

  // const [players,setPlayers] = useState([])

  // useEffect(()=> {
  //   setPlayers(leaderBoard)
  // }, [players])

  // console.log(leaderBoard)
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Leader Board</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup as="ol" numbered>
        {
          leaderBoard.map((player) => {
  return (
      <ListGroup.Item as='li' key={player.id}>
      <div className="fw-bold">{player.name}</div>
            <Badge variant='primary' pill>
        {player.totalWins}
      </Badge>
      </ListGroup.Item>

  )

          })
        }
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
