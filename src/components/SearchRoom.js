import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function SearchRoom() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useNavigate()


  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Search Room</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
         
        </Card.Body>
      </Card>

    </>
  )
}
