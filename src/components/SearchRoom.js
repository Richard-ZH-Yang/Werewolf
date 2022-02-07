import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function SearchRoom() {
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
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Search Room</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
        </Card.Body>
      </Card>
      <Button className='btn text-center w-100 mt-2' onClick={handleLogout}>Log out</Button>
    </>
  )
}
