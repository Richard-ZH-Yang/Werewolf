import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Button, Alert, CardGroup } from 'react-bootstrap'
import { useAuth, logout } from '../contexts/AuthContext'
import { useFetch } from './useFetch'
import Player from './Player'

export default function MainRoom() {
  const { loading, room } = useFetch('http://localhost:4567/rooms/1/')
  const [error, setError] = useState('')
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
      <CardGroup>
        {loading ? (
          <h1>loading ...</h1>
        ) : (
          room.players.map((player) => {
            return <Player key={player.id} {...player} />
          })
        )}
      </CardGroup>

      <Button className='btn text-center w-100 mt-2' onClick={handleLogout}>
        Log out
      </Button>
    </>
  )
}


