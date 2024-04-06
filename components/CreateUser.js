import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

export default function CreateUser() {
  const { user } = useAuth();
  const [birdsSeen, setBirdsSeen] = useState(() => {
    const savedBirdsSeen = localStorage.getItem('birdsSeen');
    return savedBirdsSeen ? parseInt(savedBirdsSeen, 10) : 0;
  });

  const incrementBirdCounter = () => {
    setBirdsSeen(birdsSeen + 1);
  };

  const decrementBirdCounter = () => {
    if (birdsSeen > 0) {
      setBirdsSeen(birdsSeen - 1);
    }
  };

  useEffect(() => {
    localStorage.setItem('birdsSeen', birdsSeen.toString());
  }, [birdsSeen]);

  return (
    <>
      <Card>
        <Card.Body style={{ backgroundColor: '#EFA282' }}>
          <Card.Text>
            {user.photoURL && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.photoURL} alt={user.displayName} style={{ width: '140px', borderRadius: '60%' }} />
            )}
            <h1>Name: {user.displayName}</h1>
            <h1>Email: {user.email}</h1>
            {user.metadata?.lastSignInTime && <h1>Last Login: {user.metadata.lastSignInTime}</h1>}
            <h1>Birds Seen: {birdsSeen}</h1>
            <button type="button" onClick={incrementBirdCounter}>Saw a Bird!</button>
            <button type="button" onClick={decrementBirdCounter}>Made a Mistake!</button>
            {birdsSeen === 10 && <p>You have seen 10 birds! Keep up the good work!</p>}
            {!user.metadata?.lastSignInTime && <h1>Last Login: Loading...</h1>}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
