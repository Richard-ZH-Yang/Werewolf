import React, { useState } from 'react'
import { Card, Button, Alert, Form } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useFetch } from './useFetch'

export default function SearchRoom() {
  const [error, setError] = useState('')
  const [roomNumber, setRoomNumber] = useState(0)
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  // send a get request, if rejected with 404 status, show an error message. Otherwise direct to the main room page with the correct url
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:4567/rooms/${roomNumber}`)
      if (response.status === 404) {
        setError('cannot find that room')
        setTimeout(()=> {
          setError('')
        }, 2000)
      }
      console.log(response.status)
      const room = await response.json()
      console.log(room)
    } catch (e) {
      console.log(e)
      console.log('ERROR')
    }

    // TODO: communicate with the backend, send a get request, if rejected, show an error message, otherwise direct to the main room page with the correct url
  }

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
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <h1 className='text-center mb-4'>Search Room</h1>
          <h4 className='text-center mb-4'>
            {currentUser.email} : {currentUser.displayName}
          </h4>
          <Form.Label>Please enter the room number:</Form.Label>
          <Form.Control
            type='number'
            placeholder='1234'
            required
            onChange={(e) => setRoomNumber(e.target.value)}
          />
          <Form.Text className='text-muted'>
            You could enter an existing room or create a new one
          </Form.Text>
        </Form.Group>
        <Button className='btn text-center w-100 mt-2' type='submit'>
          Submit
        </Button>
      </Form>

      <Button className='btn text-center w-100 mt-2' onClick={handleLogout}>
        Log out
      </Button>
    </>
  )
}
