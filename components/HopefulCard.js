import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteHopeful } from '../api/hopefulData';

function HopefulCard({ hopefulsObj, onUpdate }) {
  const [seenToggled, setSeenToggled] = useState(false);

  const toggleButton = () => {
    setSeenToggled(!seenToggled);
  };
  const deleteThisBird = () => {
    if (window.confirm(`Delete ${hopefulsObj.birdName}?`)) {
      deleteHopeful(hopefulsObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={hopefulsObj.image} alt={hopefulsObj.birdName} style={{ height: '200px' }} />
      <Card.Body>
        <Card.Title>{hopefulsObj.birdName}</Card.Title>
        <Button onClick={toggleButton}>
          {seenToggled ? 'SEEN' : 'UNSEEN' }
        </Button>
        <Link href={`/hopefuls/edit/${hopefulsObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisBird} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>

  );
}

HopefulCard.propTypes = {
  hopefulsObj: PropTypes.shape({
    birdName: PropTypes.string,
    habitat: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    seen: PropTypes.bool,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default HopefulCard;
