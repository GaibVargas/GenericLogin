import React, { useState } from 'react';

import { Container, MainTitle, ButtonContainer, Button } from './styles';

import LoginModal from '../../components/LoginModal';
import RegisterModal from '../../components/RegisterModal';

export default function Initial() {
  const [displayRegister, setDisplayRegister] = useState(false);
  const [displayLogin, setDisplayLogin] = useState(false);

  return(
    <Container>
      <MainTitle>Made for training skills. Enjoy it!</MainTitle>
      <ButtonContainer>
        <Button
          onClick={() => setDisplayRegister('flex')}
          color='#E3E3E3'
        >Register</Button>
        <Button
          onClick={() => setDisplayLogin(true)}
          color='#E3E3E3'
        >Login</Button>
      </ButtonContainer>

      <RegisterModal showRegister={displayRegister} setDisplay={setDisplayRegister} />
      <LoginModal showLogin={displayLogin} setDisplay={setDisplayLogin} />

    </Container>
  );
}
