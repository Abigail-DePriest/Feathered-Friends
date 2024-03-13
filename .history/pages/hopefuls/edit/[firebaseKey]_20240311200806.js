import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleHopeful } from '../../../api/hopefulData';
import BirdForm from '../../../components/AddNewBird';
import { getFlockMember } from '../../../api/flockData';

export default function EditHopeful() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;
  const [birdId, isFlock] = firebaseKey.split('_');
  useEffect(() => {
    if (isFlock === 'true') {
      getFlockMember(birdId).then(setEditItem);
    } else {
      getSingleHopeful(birdId).then(setEditItem);
    }
  }, [firebaseKey]);

  return (<BirdForm obj={editItem} />);
}
