import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Button, Alert, Row, Col, Container } from 'react-bootstrap'
import { CardDeck } from 'reactstrap'
import { useAuth, logout } from '../contexts/AuthContext'
import { useFetch } from './useFetch'
import Player from './Player'

export default function MainRoom() {
  const { loading, seating, room } = useFetch('http://localhost:4567/rooms/1/')
  const [error, setError] = useState('')
  const [currentSeat, setCurrentSeat] = useState('')
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
      <CardDeck style={{ display: 'flex', flexDirection: 'row' }}>
        {loading ? (
          <h1>loading ...</h1>
        ) : (
          seating.map((player, index) => {
            return <Player key={player.id} {...player} seatNumber={index} />
          })
        )}
      </CardDeck>

      <Button className='btn text-center w-100 mt-2' onClick={handleLogout}>
        Log out
      </Button>
    </>
  )
}


