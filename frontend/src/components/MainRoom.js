import React, { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Card,
  Button,
  Alert,
  Row,
  Col,
  Container,
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap'
import { useAuth, logout } from '../contexts/AuthContext'
import ShowIdentity from './ShowIdentity'
import LeaderBoard from './LeaderBoard'
import Rules from './Rules'
// import { useFetch } from './useFetch'
// import Player from './Player'
import uuid from 'react-uuid'
import PropTypes from 'prop-types'

export default function MainRoom() {
  const { id } = useParams()
  const url = `http://localhost:4321/api/rooms/${id}`
  const leaderBoardUrl = 'http://localhost:4321/api/players'

  const [error, setError] = useState('')
  const [currentSeat, setCurrentSeat] = useState(0)
  const [isJudge, setIsJudge] = useState(false)
  const [loading, setLoading] = useState(true)
  const [seating, setSeating] = useState([])
  const [showIdentity, setShowIdentity] = useState(false)
  const [showAllIdentity, setShowAllIdentity] = useState(false)
  const [showLeaderBoard, setShowLeaderBoard] = useState(false)
  const [showRules, setShowRules] = useState(false)
  const [leaderBoard, setLeaderBoard] = useState([])

  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const getRoom = useCallback(async () => {
    const response = await fetch(url)
    const room = await response.json()

    if (response.status === 404 || response.status === 400) {
      displayError(room.result)
      setTimeout(() => {
        navigate(`/`, { replace: true })
      }, 2000)
    }
    let seating = room.seats

    // sort the seat number in ascending order
    seating.sort((a, b) => {
      return a.id - b.id
    })

    const currentPosition = getUserPosition(room, currentUser.email)
    setCurrentSeat(currentPosition)
    setSeating(seating)

    seating[currentPosition - 1].player.identity === 'JUDGE'
      ? setIsJudge(true)
      : setIsJudge(false)
    setLoading(false)
  }, [url])

  const getLeaderBoard = useCallback(async () => {
    const response = await fetch(leaderBoardUrl)
    const currentPlayers = await response.json()

    currentPlayers.sort((a, b) => {
      return b.totalWins - a.totalWins || a.name - b.name
    })

    let result = []
    currentPlayers.forEach((player) => {
      result.push({
        id: player.id,
        name: player.name,
        totalWins: player.totalWins,
        wolfWins: player.wolfWins,
        humanWins: player.totalWins - player.wolfWins,
      })
    })

    result.sort((a, b) => {
      return b.totalWins - a.totalWins || a.name - b.name
    })

    setLeaderBoard(result)
  }, [url])

  const displayError = (message) => {
    setError(message)
    setTimeout(() => {
      setError('')
    }, 2000)
  }

  useEffect(() => {
    setInterval(getRoom, 5000)
  }, [])

  useEffect(() => {
    getRoom()
  }, [url, getRoom])

  useEffect(() => {
    getLeaderBoard()
  }, [url, getLeaderBoard])

  async function handleLogout() {
    setError('')
    try {
      await logout()
      navigate('/login', { replace: true })
    } catch {
      setError('Failed to log out')
    }
  }

  async function handleChangeSeat(seatNumber) {
    if (currentSeat === seatNumber) {
      displayError('You already here, please try to refresh the page')
    } else if (seatIsOccupied(seatNumber, seating)) {
      displayError("It's occupied, please try to refresh the page")
    } else if (isJudge) {
      displayError('Judge should not able to switch seats')
    } else {
      // success based on current state, also need to check with the backend

      const plan = {
        from: currentSeat,
        to: seatNumber,
        name: currentUser.displayName,
      }

      try {
        const res = await fetch(
          `http://localhost:4321/api/rooms/${id}/${encodeURIComponent(
            currentUser.email
          )}`,
          {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(plan),
          }
        )

        const result = await res.json()

        if (res.status === 404 || res.status === 400) {
          displayError(`ERROR: ${result.result}`)
        } else {
          setCurrentSeat(seatNumber)
          getRoom()
        }
      } catch {
        displayError(`ERROR! Please try again`)
      }
    }
  }

  function handleViewIdentity() {
    if (currentSeat === 0) {
      displayError('Please select a seat first')
    } else {
      setShowIdentity(true)
    }
  }

  function handleCloseViewIdentity() {
    if (currentSeat === 0) {
      displayError('Please select a seat first')
    } else {
      setShowIdentity(false)
    }
  }

  function handleToggleViewAllIdentities() {
    setShowAllIdentity(!showAllIdentity)
  }

  async function handleResetIdentities() {
    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
      })

      const result = await res.json()

      if (res.status === 404 || res.status === 400) {
        displayError(`ERROR: ${result.result}`)
      } else {
        getRoom()
      }
    } catch {
      displayError(`ERROR! Please try again`)
    }
  }

  function handleViewLeaderBoard() {
    getLeaderBoard()
    setShowLeaderBoard(true)
  }

  function handleCloseLeaderBoard() {
    setShowLeaderBoard(false)
  }

  function handleViewRules() {
    setShowRules(true)
  }

  function handleCloseRules() {
    setShowRules(false)
  }

  async function handleCloseRoom() {
    try {
      const res = await fetch(`http://localhost:4321/api/rooms/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      })

      const result = await res.json()

      if (res.status === 404 || res.status === 400) {
        displayError(`ERROR: ${result.result}`)
      } else {
        navigate(`/`, { replace: true })
      }
    } catch {
      displayError(`ERROR! Please try again`)
    }
  }

  return (
    <>
    {error && <Alert variant='danger'>{error}</Alert>}
      {loading ? (
        <h1>loading ...</h1>
      ) : (
        <div className='MainRoom'>
          <Container className='h-100'>
            

            <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
              <Container>
                <Navbar.Brand>Werewolf</Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                  <Nav className='me-auto'>
                    <Nav.Item>
                      <Button
                        disabled={loading}
                        className='btn text-center'
                        variant='dark'
                        onClick={handleViewLeaderBoard}
                      >
                        Leader Board
                      </Button>
                    </Nav.Item>
                    <Nav.Item>
                      <Button
                        disabled={loading}
                        className='btn text-center'
                        variant='dark'
                        onClick={handleViewRules}
                      >
                        View Rules
                      </Button>
                    </Nav.Item>
                  </Nav>
                  <Nav>
                    <NavDropdown
                      title={currentUser.displayName}
                      id='collasible-nav-dropdown'
                    >
                      <NavDropdown.Item>
                        <Button
                          disabled={loading}
                          className='btn text-center w-100'
                          variant='dark'
                          onClick={handleLogout}
                        >
                          Log out
                        </Button>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>

            <Row className='h-100 w-100 align-items-center'>
              {seating.map((seat) => {
                let seatNumber = seat.id
                return (
                  <Col
                    key={seat.player.id || uuid()}
                    className='container-fluid mt-4 treeViewComponent h-100'
                  >
                    <Card border='primary' style={{ width: '18 rem', flex: 1 }}>
                      <Card.Body className='d-flex flex-column mb-2'>
                        <Card.Title as='h2'>{seatNumber}</Card.Title>

                        <h4>{seat.player.name}</h4>
                        <p>{showAllIdentity ? seat.player.identity : null}</p>
                        <Button
                          disabled={loading}
                          onClick={() => handleChangeSeat(seatNumber)}
                          className='btn mt-auto'
                          variant='info'
                        >
                          Sit
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </Container>
          {isJudge ? (
            <div className='buttons-judge'>
              <Button
                disabled={loading}
                className='btn text-center w-100 mt-2'
                onClick={handleToggleViewAllIdentities}
              >
                Toggle View All Identities
              </Button>
              <Button
                disabled={loading}
                className='btn text-center w-100 mt-2'
                onClick={handleResetIdentities}
              >
                Reset Identities
              </Button>
              <Button
                disabled={loading}
                className='btn text-center w-100 mt-2'
                onClick={handleCloseRoom}
              >
                Close Room
              </Button>
            </div>
          ) : (
            <div className='buttons-notJudge'>
              <Button
                disabled={loading}
                className='btn text-center w-100 mt-2'
                onClick={handleViewIdentity}
              >
                View my identity
              </Button>
            </div>
          )}

          <ShowIdentity
            show={showIdentity}
            onHide={handleCloseViewIdentity}
            seat={currentSeat === 0 ? {} : seating[currentSeat - 1]}
            loading={loading}
            displayError={displayError}
          />

          <LeaderBoard
            show={showLeaderBoard}
            onHide={handleCloseLeaderBoard}
            leaderBoard={leaderBoard}
          />

          <Rules show={showRules} onHide={handleCloseRules} />
        </div>
      )}
    </>
  )
}

function seatIsOccupied(seatNumber, seating) {
  let result = false
  seating.forEach((seat) => {
    if (seat.id === seatNumber && seat.player.name !== '') {
      result = true
    }
  })
  return result
}

function getUserPosition(seating, userId) {
  let result = 0
  seating.seats.forEach((seat) => {
    if (seat.player.id === userId) {
      result = seat.id
    }
  })
  return result
}
