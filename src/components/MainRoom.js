import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Button, Alert, Row, Col, Container } from 'react-bootstrap'
import { useAuth, logout } from '../contexts/AuthContext'
import { useFetch } from './useFetch'
import Player from './Player'

export default function MainRoom() {
  const { loading, seating, room } = useFetch('http://localhost:4567/rooms/1/')
  const [error, setError] = useState('')
  const [currentSeat, setCurrentSeat] = useState(0)
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()


  async function handleLogout() {
    setError('')

    try {
      await logout()
      navigate('/login', { replace: true })
    } catch {
      setError('Failed to log out')
    }
  }

  return (
    <>
      {/* <CardDeck style={{ display: 'flex', flexDirection: 'row' }}> */}
      <Container
        className='h-100'
        >
        <Row className='h-100 w-100 align-items-center'>
            {loading ? (
              <Col md={20} className='treeViewComponent h-100'>
                <h1>loading ...</h1>
              </Col>
              
            ) : (
              seating.map((player, index) => {
                return <Player key={player.id} {...player} seatNumber={index + 1} loading = {loading} currentSeat = {currentSeat} seating = {seating}/>
              })
            )}
        </Row>
      </Container>

      <Button className='btn text-center w-100 mt-2' onClick={handleLogout}>
        Log out
      </Button>
    </>
  )
}


