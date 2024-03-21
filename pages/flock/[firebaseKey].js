/* eslint-disable @next/next/no-img-element */
/* import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import viewFlockMemberDetails from '../../api/mergeData';

export default function ViewFlockMember() {
  const [flockMemberDetails, setFlockMemberDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewFlockMemberDetails(firebaseKey).then(setFlockMemberDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={flockMemberDetails.image} alt={flockMemberDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {flockMemberDetails.title} by {flockMemberDetails.flockObject?.birdName} {flockMemberDetails.flockObject?.location}
        </h5>
        <p>{flockMemberDetails.description || ''}</p>
        <hr />
        <p />
      </div>
    </div>
  );
} */
