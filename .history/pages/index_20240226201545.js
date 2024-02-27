import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
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
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/hopefuls/new" passHref>
        <Button>Add A Future Friend</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {hopefuls.map((hopeful) => (
          <HopefulCard key={hopeful.firebaseKey} hopefulsObj={hopeful} onUpdate={getAllHopefuls} />
        ))}
      </div>

    </div>
  );
}

export default Home;
