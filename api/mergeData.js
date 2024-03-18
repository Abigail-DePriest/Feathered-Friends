/* import { clientCredentials } from '../utils/client';

const mergeData = async (hopefuls, actionType, data) => {
  try {
    const endpoint = clientCredentials.databaseURL;

    if (actionType === 'edit') {
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to edit entity');
      }
    } else if (actionType === 'delete') {
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete entity');
      }
    } else {
      throw new Error('Invalid action type');
    }

    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

export default mergeData; */
