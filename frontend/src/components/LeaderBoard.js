import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function LeaderBoard({ show, onHide }) {

  const url = `http://localhost:4321/api/players`

  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

   const getLeaderBoard = useCallback(async () => {
     const response = await fetch(url)
     const currentPlayers = await response.json()

     // sort the players in descending order of the totalWins
     currentPlayers.sort((a, b) => {
       return a.totalWins - b.totalWins
     })

     currentPlayers.reverse()

     setPlayers(currentPlayers)
     setLoading(false)
   }, [url])

     useEffect(() => {
       getLeaderBoard()
     }, [getLeaderBoard])

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
