import React, { useState } from 'react'
import { Card, Button, Alert, Form } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useFetch } from './useFetch'
import CreateRoom from './CreateRoom'

export default function SearchRoom() {
  const [error, setError] = useState('')
  const [roomNumber, setRoomNumber] = useState(0)
  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const displayError = (message) => {
    setError(message)
    setTimeout(() => {
      setError('')
    }, 2000)
  }

  // send a get request, if rejected with 404 status, show an error message. Otherwise direct to the main room page with the correct url
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:4321/api/rooms/${roomNumber}`)
      
      const res = await response.json()
      if (response.status === 404) {
        displayError(`ERROR: ${res.result}`)
      } else {
        // success
        navigate(`/mainroom/${roomNumber}`, { replace: true })
      }
    } catch (e) {
      displayError('ERROR! Please try again')
    }
  }

  async function handleLogout() {
    try {
      await logout()
      navigate('/login', { replace: true })
    } catch {
      displayError('Failed to log out')
    }
  }

  function handleCreateRoom() {
    setShowCreateRoom(!showCreateRoom)
    console.log(showCreateRoom)
  }

  return (
    <>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <h1 className='text-center mb-4'>Search Room</h1>
          {/* <h4 className='text-center mb-4'>
            {currentUser.email} : {currentUser.displayName}
          </h4> */}
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
          Join
        </Button>
      </Form>

      <Button className='btn text-center w-100 mt-2' onClick={handleLogout}>
        Log out
      </Button>

      <Button
        variant={showCreateRoom ? 'danger' : 'success'}
        className='btn text-center w-100 mt-2'
        onClick={handleCreateRoom}
      >
        {showCreateRoom ? 'Close' : 'Create a new room'}
      </Button>
      {showCreateRoom && <CreateRoom displayError={displayError} />}
    </>
  )
}
