import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteHopeful } from '../api/hopefulData';

function HopefulCard({ hopefulObj, onUpdate }) {
  const deleteThisBird = () => {
    if (window.confirm(`Delete ${hopefulObj.birdName}?`)) {
      deleteHopeful(hopefulObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={hopefulObj.image} alt={hopefulObj.birdName} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{hopefulObj.birdName}</Card.Title>
        <Link href={`/hopefuls/edit/${hopefulObj.firebaseKey}`} passHref>
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
  hopefulObj: PropTypes.shape({
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
