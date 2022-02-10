import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

const CreateRoom = () => {
  const wolfRef = useRef()
  const civilianRef = useRef()
  const prophetRef = useRef()
  const witchRef = useRef()
  const hunterRef = useRef()
  const idiotRef = useRef()
  const guardianRef = useRef()
    const { currentUser } = useAuth()


  function handleSubmit(e) {
    e.preventDefault()
    const newRoom = {
      judgeId: currentUser.email,
      wolf: parseInt(wolfRef.current.value),
      civilian: parseInt(civilianRef.current.value),
      prophet: prophetRef.current.checked ? 1 : 0,
      witch: witchRef.current.checked ? 1 : 0,
      hunter: hunterRef.current.checked ? 1 : 0,
      idiot: idiotRef.current.checked ? 1 : 0,
      guardian: guardianRef.current.checked ? 1 : 0
    }
    // TODO: send post request to backend
    // if success, create and direct to new room with current user as a judge
    // Otherwise, show an error message
    console.log(newRoom)
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
        Submit
      </Button>
    </Form>
  )
}

export default CreateRoom
