import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleHopeful } from '../../../api/hopefulData';
import HopefulsForm from '../../../components/forms/HopefulsForm';

export default function EditHopeful() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;
  useEffect(() => {
    getSingleHopeful(firebaseKey).then(setEditItem);
  }, [firebaseKey]);
  return (<HopefulsForm obj={editItem} />);
}
