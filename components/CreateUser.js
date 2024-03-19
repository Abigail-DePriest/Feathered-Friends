/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useAuth } from '../utils/context/authContext';

export default function CreateUser() {
  const { user } = useAuth();
  return (
    <>
      <img src={user.photoURL} alt="Abby DePriest" style={{ width: '140px', borderRadius: '60%' }} />
      <h1>Name: {user.displayName}</h1>
      <h1>Email: {user.email} </h1>
      <h1>Last Login {user.metadata?.lastSignInTime}</h1>
    </>
  );
}
