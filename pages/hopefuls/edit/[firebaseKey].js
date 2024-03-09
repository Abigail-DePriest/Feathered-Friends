import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleHopeful } from '../../../api/hopefulData';
import BirdForm from '../../AddNewBird';

export default function EditHopeful() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;
  useEffect(() => {
    getSingleHopeful(firebaseKey).then(setEditItem);
  }, [firebaseKey]);
  return (<BirdForm obj={editItem} />);
}
