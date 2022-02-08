import React from 'react';
import { Card, Button, Alert } from 'react-bootstrap'

const Player = ({name}) => {
  return <>
   <Card>
    <Card.Body>
     <h4>{name}</h4>
    </Card.Body>
   </Card>
  </>;
};

export default Player;
