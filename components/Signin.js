/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
        fontWeight: 'heavy bold',
        color: '#FF7F50',
        border: '15px, black',
      }}
    >
      <h1>Welcome!</h1>
      <p>"In the empty lot - a place
        not natural, but wild - among
        the trash of human absence,

        the slough and shamble
        of the city's seasons, a few
        old locusts bloom.

        A few wood birds
        fly and sing
        in the new foliage

        --warblers and tanagers, birds
        wild as leaves; in a million
        each one would be rare,
        new to the eyes. A man
        couldn't make a habit
        of such color,

        such flight and singing.
        But they're the habit of this
        wasted place. In them

        the ground is wise. They are
        its remembrance of what is."

        Wendell Berry
      </p>
      <Button type="button" size="lg" className="copy-btn" style={{ backgroundColor: '#FF7F50' }} onClick={signIn}>
        CHIRP
      </Button>
    </div>
  );
}

export default Signin;
