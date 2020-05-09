import React from 'react';

import { Container } from './styles';

export default function ErrorModal({ errorText, showErrorModal, displayErrorModal }) {
  return(
    <Container show={showErrorModal}>
      <span
        className="close"
        onClick={() => displayErrorModal(false)}
      >x</span>
      <span className="text">{errorText}</span>
    </Container>
  );
}
