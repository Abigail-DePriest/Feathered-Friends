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
  // const [hopefuls, setHopefuls] = useState([]);
  const [seen, setSeen] = useState(false);
  const [selectedHabitat, setSelectedHabitat] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const toggleSeen = () => {
    setSeen((prev) => !prev);
    setLocation('');
    setDate('');
  };
  const router = useRouter();
  const { user } = useAuth();

  const habitatOptions = [
    { value: 'forest', label: 'Forest' },
    { value: 'grasslands', label: 'Grasslands' },
    { value: 'mountains', label: 'Mountains' },
    { value: 'coastal', label: 'Coastal' },
    { value: 'wetlands', label: 'Wetlands' },
  ];

  const handleHabitatChange = (e) => {
    setSelectedHabitat(e.target.value);
  };

  useEffect(() => {
  // getHopefuls(user.uid).then(setHopefuls);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (seen) {
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
      <h2 className="text-white mt-5">{obj?.firebaseKey ? 'Update' : 'Create'} New Friend </h2>

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
          onChange={handleHabitatChange}
          className="mb-3"
          value={selectedHabitat}
          required
        >
          <option value="">Select a Habitat</option>
          {
            habitatOptions.map((habitat) => (
              <option
                key={habitat.value}
                value={habitat.value}
              >
                {habitat.label}
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
      <Button onClick={toggleSeen}>
        { seen ? 'Disable Seen' : 'Enable Seen'}
      </Button>
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
        }} // if "seen" then other input fields for Location and Date should drop down/populate. Also, button should change to "CREATE FRIEND"
      />

      {/* CONDITIONAL RENDERING FOR LOCATION AND DATE */}
      {seen && (
      <FloatingLabel controlId="floatingInput2" label="location" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Location Found"
          name="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </FloatingLabel>
      )}
      {seen && (
      <FloatingLabel controlId="floatingInput2" label="date" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Date Found"
          name="Date Found"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </FloatingLabel>
      )}

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} New Friend </Button>
    </Form>
  );
}

BirdForm.propTypes = {
  obj: PropTypes.shape({
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
};

BirdForm.defaultProps = {
  obj: initialState,
};

export default BirdForm;
