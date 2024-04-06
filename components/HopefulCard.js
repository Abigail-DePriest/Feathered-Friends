import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteHopeful } from '../api/hopefulData';
// import { moveBirdToFlock } from '../api/flockData';

function HopefulCard({ hopefulsObj, onUpdate }) { // should I pass a selectedHabitat argument here? habitat isn't showing on the card currently.
  // const [seenToggled, setSeenToggled] = useState(false);

  /* const toggleButton = () => {
    setSeenToggled(!seenToggled);
    if (!seenToggled) {
      moveBirdToFlock(hopefulsObj).then(() => {
      }).catch((error) => {
        console.error('Error moving bird to flock:', error);
      });
    }
  }; */
  const deleteThisBird = () => {
    if (window.confirm(`Delete ${hopefulsObj.birdName}?`)) {
      deleteHopeful(hopefulsObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{
      width: '18rem', margin: '10px', backgroundColor: '#EFA282', borderRadius: '45%',
    }}
    >
      <Card.Img variant="top" src={hopefulsObj.image} alt={hopefulsObj.birdName} style={{ height: '200px', borderRadius: '50px' }} />
      <Card.Body>
        <Card.Title>{hopefulsObj.birdName}</Card.Title>
        <p className="card-text bold"> {hopefulsObj.description} </p>
        <p className="card-text bold"> {hopefulsObj.habitat} </p>
        <Link href={`/hopefuls/edit/${hopefulsObj.firebaseKey}_false`} passHref>
          <Button variant="✏️">✏️</Button>
        </Link>
        <Button variant="danger" style={{ background: '#FF5757', border: '1px solid FF5757' }} onClick={deleteThisBird} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>

  );
}
// write location, date found but only show up if "seen" is true....code for MyFlock card in here.

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

// need to have "seen" route to edit form and then toggle seen so it lands on Flock page after location/date edit. Ideally would also like for it to delete.
