import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getHopefuls } from '../api/hopefulData';
import HopefulCard from '../components/HopefulCard';

function Home() {
  const [hopefuls, setHopefuls] = useState([]);

  const { user } = useAuth();

  const getAllHopefuls = () => {
    getHopefuls(user.uid).then(setHopefuls);
  };

  useEffect(() => {
    getAllHopefuls();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (// maybe deal with selectedHabitat here?
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {hopefuls.map((hopeful) => (
          <HopefulCard key={hopeful.firebaseKey} hopefulsObj={hopeful} onUpdate={getAllHopefuls} />
        ))}
      </div>

    </div>
  );
}

export default Home;
