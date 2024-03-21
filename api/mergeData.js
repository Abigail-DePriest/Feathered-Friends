/* import { getFlockMember } from './flockData';

const viewFlockMemberDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getFlockMember(flockMemberFirebaseKey)
    .then((flockObject) => {
      getSingleAuthor(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
    }).catch((error) => reject(error));
});

export default viewFlockMemberDetails; */
