import React, { useEffect, useState } from 'react';
import { getFlock } from '../api/flockData';
import { useAuth } from '../utils/context/authContext';
import FlockCard from '../components/FlockCard';

function Flock() {
  const [flockMembers, setFlockMembers] = useState([]);
  const { user } = useAuth();

  const getTheFlock = () => {
    getFlock(user.uid).then(setFlockMembers);
  };
  useEffect(() => {
    getTheFlock();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {flockMembers.map((flock) => (
          <FlockCard key={flock.firebaseKey} flockObj={flock} onUpdate={getTheFlock} />
        ))}
      </div>

    </div>
  );
}

export default Flock;
