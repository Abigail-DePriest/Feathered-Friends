import React, { useEffect, useState } from 'react';
import { getFlock } from '../api/flockData';
import { useAuth } from '../utils/context/authContext';
import FlockCard from '../components/FlockCard';

function Flock() {
  // TODO: Set a state for books
  const [flockMembers, setFlockMembers] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  const getTheFlock = () => {
    getFlock(user.uid).then(setFlockMembers);
  };

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getTheFlock();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {flockMembers.map((flock) => (
          <FlockCard key={flock.firebaseKey} flockObj={flock} onUpdate={getTheFlock} />
        ))}
      </div>

    </div>
  );
}

export default Flock;
