import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createHopeful, updateHopeful } from '../api/hopefulData';
import { createFlockMember, updateFlock } from '../api/flockData';

const initialState = {
  birdName: '',
  image: '',
  description: '',
  habitat: '', // Dropdown value
  location: '',
  date: '',
  seen: false,
};

function BirdForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
    } else if (obj === 'flock') {
      setFormInput((prev) => ({ ...prev, seen: true }));
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formInput.seen) {
      if (obj.firebaseKey) {
        updateFlock(formInput).then(() => router.push('/flock'));
      } else {
        const payload = { ...formInput, uid: user.uid };
        createFlockMember(payload).then(({ name }) => {
          const patchPayload = { firebaseKey: name };
          updateFlock(patchPayload).then(() => {
            router.push('/flock');
          });
        });
      }
    } else if (obj.firebaseKey) {
      updateHopeful(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createHopeful(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateHopeful(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj?.firebaseKey ? 'Update' : 'Create'} New Friend</h2>

      <FloatingLabel controlId="floatingInput1" label="Bird Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a name"
          name="birdName"
          value={formInput.birdName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Bird Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Habitat" className="mb-3">
        <Form.Control
          as="select"
          name="habitat"
          value={formInput.habitat}
          onChange={handleChange}
          required
        >
          <option value="">Select Habitat</option>
          <option value="Farmland">Farmland</option>
          <option value="Forestland">Forestland</option>
          <option value="Grassland">Grassland</option>
          <option value="Urban/Park Areas">Urban/Park Areas</option>
          <option value="Rivers, Streams, Ponds">Rivers, Streams, Ponds</option>
        </Form.Control>
      </FloatingLabel>

      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button onClick={() => setFormInput((prev) => ({ ...prev, seen: !prev.seen }))}>
        {formInput.seen ? 'Disable Seen' : 'Enable Seen'}
      </Button>

      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="seen"
        name="seen"
        label="Seen?"
        checked={formInput.seen}
        onChange={handleChange}
      />

      {formInput.seen && (
        <FloatingLabel controlId="floatingInput3" label="Location Found" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Location Found"
            name="location"
            value={formInput.location}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      )}

      {formInput.seen && (
        <FloatingLabel controlId="floatingInput4" label="Date Found" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Date Found"
            name="date"
            value={formInput.date}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      )}

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} New Friend</Button>
    </Form>
  );
}

BirdForm.propTypes = {
  obj: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      birdName: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      habitat: PropTypes.string,
      seen: PropTypes.bool,
      location: PropTypes.string,
      date: PropTypes.string,
      uid: PropTypes.string,
      firebaseKey: PropTypes.string,
    }),
  ]),
};

BirdForm.defaultProps = {
  obj: initialState,
};

export default BirdForm;
