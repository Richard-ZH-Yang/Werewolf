import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'


export const MainRoom = () => {
  const { players } = useFetch('http://localhost:4567/rooms/1/')
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()

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
