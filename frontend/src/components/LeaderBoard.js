import React, { useState, useCallback, useEffect } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'

export default function LeaderBoard({ show, onHide, leaderBoard }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Leader Board</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Total Wins</th>
              <th>Human Wins</th>
              <th>Wolf Wins</th>
            </tr>
          </thead>
          <tbody>
            {leaderBoard.map((player, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{player.name}</td>
                  <td>{player.totalWins}</td>
                  <td>{player.humanWins}</td>
                  <td>{player.wolfWins}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
