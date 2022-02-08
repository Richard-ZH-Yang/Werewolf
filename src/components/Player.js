import React from 'react';
import { Card, Button, Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Player = ({name}) => {
  return <>
   <Card>
    <Card.Body>
     <h4>{name}</h4>
    </Card.Body>
   </Card>
  </>;
};

Player.propTypes = {
 name: PropTypes.string.isRequired,
}

Player.defaultProps = {
 name: 'no name'
}

export default Player;
