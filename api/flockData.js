import { clientCredentials } from '../utils/client';
// import { deleteHopeful } from './hopefulData';

const endpoint = clientCredentials.databaseURL;

const getFlock = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/flock.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) { // create filter for "seen" birds
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createFlockMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/flock.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getFlockMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/flock/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateFlock = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/flock/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

/* const moveBirdToFlock = async (hopefulData) => {
  try {
    await createFlockMember(hopefulData);

    await deleteHopeful(hopefulData.firebaseKey);
  } catch (error) {
    console.error('Error moving bird to flock:', error);
  }
}; */ // firebaseKey taken out and new firebaseKey created

const deleteFlockMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/flock/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getFlock,
  createFlockMember,
  deleteFlockMember,
  getFlockMember,
  updateFlock,
  // moveBirdToFlock,
};
