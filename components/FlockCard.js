import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { deleteFlockMember } from '../api/flockData';

function FlockCard({ flockObj, onUpdate }) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const deleteThisFlockMember = () => {
    if (window.confirm(`Delete ${flockObj.birdName}?`)) {
      deleteFlockMember(flockObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{
      width: '18rem', margin: '10px', backgroundColor: '#EFA282', borderRadius: '50px',
    }}
    >
      <Card.Img variant="top" src={flockObj.image} alt={flockObj.birdName} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{flockObj.birdName}</Card.Title>
        <p className="card-text bold"> {flockObj.habitat} </p>
        <p className="card-text bold"> {flockObj.location} </p>
        <p className="card-text bold"> {flockObj.date} </p>
        {/* Button to trigger modal */}
        <Button variant="outline-info" onClick={handleShowModal}>
          Notes
        </Button>
        <Link href={`/hopefuls/edit/${flockObj.firebaseKey}_true`} passHref>
          <Button variant="outline success">EDIT</Button>
        </Link>
        {/* Delete button */}
        <Button variant="outline danger" onClick={deleteThisFlockMember} className="m-2">
          DELETE
        </Button>
      </Card.Body>

      {/* Modal for displaying description */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{flockObj.birdName} Notes </Modal.Title>
        </Modal.Header>
        <Modal.Body>{flockObj.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

FlockCard.propTypes = {
  flockObj: PropTypes.shape({
    birdName: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    habitat: PropTypes.string,
    location: PropTypes.string,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
    seen: PropTypes.bool,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default FlockCard;
