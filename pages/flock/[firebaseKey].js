import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFlockMember } from '../../api/flockData';
import BirdForm from '../AddNewBird';

export default function EditFlock() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;
  useEffect(() => {
    getFlockMember(firebaseKey).then(setEditItem);
  }, [firebaseKey]);
  return (<BirdForm obj={editItem} />);
}
