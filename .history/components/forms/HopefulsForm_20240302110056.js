import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createHopeful, updateHopeful, getHopefuls } from '../../api/hopefulData';

const initialState = {
  birdName: '',
  image: '',
  description: '',
  habitat: '', // Dropdown value
  price: '',
  seen: '',
};

function HopefulsForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [hopefuls, setHopefuls] = useState([]);
  const [selectedHabitat, setSelectedHabitat] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getHopefuls(user.uid).then(setHopefuls);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);
  const handleSelectHabitat = (e) => {
    setSelectedHabitat(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
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
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Hopeful </h2>

      {/* TITLE INPUT  */}
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

      {/* IMAGE INPUT  */}
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

      {/* HABITAT */}
      <FloatingLabel controlId="floatingSelect" label="Habitat">
        <Form.Select
          aria-label="Habitat"
          name="habitat"
          onChange={handleSelectHabitat}
          className="mb-3"
          value={selectedHabitat}
          required
        >
          <option value="">Select a Habitat</option>
          {
            hopefuls.map((hopeful) => (
              <option
                key={hopeful.firebaseKey}
                value={hopeful.firebaseKey}
              >
                {hopeful.habitat}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
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

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="seen"
        name="seen"
        label="Seen?"
        checked={formInput.seen}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            seen: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Hopeful </Button>
    </Form>
  );
}

HopefulsForm.propTypes = {
  obj: PropTypes.shape({
    birdName: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    habitat: PropTypes.string,
    seen: PropTypes.bool,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

HopefulsForm.defaultProps = {
  obj: initialState,
};

export default HopefulsForm;
