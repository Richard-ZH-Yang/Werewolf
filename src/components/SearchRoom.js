import React, { useState } from 'react'
import { Card, Button, Alert, Form } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function SearchRoom() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("SUBMIT")
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
          <Form.Control type='number' placeholder='i.e.1234' required />
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
