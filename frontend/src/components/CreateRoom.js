import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate, useParams } from 'react-router-dom'

const CreateRoom = ({ displayError }) => {
  const navigate = useNavigate()

  const wolfRef = useRef()
  const civilianRef = useRef()
  const prophetRef = useRef()
  const witchRef = useRef()
  const hunterRef = useRef()
  const idiotRef = useRef()
  const guardianRef = useRef()
  const { currentUser } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    const newRoom = {
      roomInfo: {
        judgeId: currentUser.email,
        judgeName: currentUser.displayName,
        wolf: parseInt(wolfRef.current.value),
        civilian: parseInt(civilianRef.current.value),
        prophet: prophetRef.current.checked ? 1 : 0,
        witch: witchRef.current.checked ? 1 : 0,
        hunter: hunterRef.current.checked ? 1 : 0,
        idiot: idiotRef.current.checked ? 1 : 0,
        guardian: guardianRef.current.checked ? 1 : 0,
      },
    }
    try {
      const res = await fetch('http://localhost:4321/api/rooms', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newRoom),
      })
      const data = await res.json()
      console.log(data)
      if (res.status === 404 || res.status === 400) {
        displayError(`ERROR: ${data.result}`)
      } else {
        navigate(`/mainroom/${data.id}`, { replace: true })
      }
    } catch (e) {
      displayError('ERROR! Please try again')
    }
  }

  return (
    <Form onSubmit={handleSubmit} className='mt-3'>
      <Form.Group className='mb-3'>
        <Form.Label>Number of Wolf:</Form.Label>
        <Form.Control
          type='number'
          defaultValue={3}
          ref={wolfRef}
          min='1'
          required
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Number of Civilians:</Form.Label>
        <Form.Control
          type='number'
          defaultValue={3}
          ref={civilianRef}
          min='1'
          required
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Select the gods:</Form.Label>
        <Form.Check
          type='checkbox'
          label='Prophet'
          ref={prophetRef}
          defaultChecked
        />
        <Form.Check
          type='checkbox'
          label='Witch'
          ref={witchRef}
          defaultChecked
        />
        <Form.Check
          type='checkbox'
          label='Hunter'
          ref={hunterRef}
          defaultChecked
        />
        <Form.Check type='checkbox' label='Idiot' ref={idiotRef} />
        <Form.Check type='checkbox' label='Guardian' ref={guardianRef} />
      </Form.Group>
      <Button className='btn text-center w-100 mt-2' type='submit'>
        Create
      </Button>
    </Form>
  )
}

export default CreateRoom
