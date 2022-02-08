import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth, logout } from '../contexts/AuthContext'
import { useFetch } from './useFetch'
import Player from './Player'


export default function MainRoom () {
  const { players } = useFetch('http://localhost:4567/rooms/1/')
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
  console.log(currentUser)

  return (
    <>
      <section className='players'>
        {players.map((player) => {
          return <Player key={player.id} {...player} />
        })}
      </section>
      <Button className='btn text-center w-100 mt-2' onClick={handleLogout}>
        Log out
      </Button>
    </>
  )
};


