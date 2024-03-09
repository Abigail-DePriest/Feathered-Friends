import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getHopefuls = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/hopefuls.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const unseenHopefuls = Object.values(data).filter((birdName) => !birdName.seen);
        resolve(unseenHopefuls);// create filter that just returns birds that are "unseen"
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createHopeful = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/hopefuls.json`, {
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

const deleteHopeful = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/hopefuls/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const updateHopeful = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/hopefuls/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleHopeful = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/hopefuls/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getHopefuls,
  createHopeful,
  deleteHopeful,
  updateHopeful,
  getSingleHopeful,
};
