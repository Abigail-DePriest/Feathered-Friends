import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteFlockMember } from '../api/flockData';

function FlockCard({ flockObj, onUpdate }) {
  const deleteThisFlockMember = () => {
    if (window.confirm(`Delete ${flockObj.birdName}?`)) {
      deleteFlockMember(flockObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={flockObj.image} alt={flockObj.birdName} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{flockObj.birdName}</Card.Title>
        <Link href={`/hopefuls/edit/${flockObj.firebaseKey}_true`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisFlockMember} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

// add logic to where "seen" boolean is set to "TRUE" when ADD NEW FRIEND on MyFlock page // STRETCH

FlockCard.propTypes = {
  flockObj: PropTypes.shape({
    birdName: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    habitat: PropTypes.string,
    location: PropTypes.string,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default FlockCard;
