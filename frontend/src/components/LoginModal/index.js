import React, { useState } from 'react';

import { useAuth } from '../../contexts/auth';
import ErrorModal from '../ErrorModal';

import {
  Box, InputContainer, CloseButton, Title,
  InputGroup, Label, Input, Button
} from '../styles/modal.styles';


export default function LoginModal({ showLogin, setDisplay }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [displayErrorModal, setDisplayErrorModal] = useState(false);
  const [errorText, setErrorText] = useState('Teste');
  const [loading, setLoading] = useState(false);

  const { userLogin } = useAuth();

  async function handleLogin() {
    setLoading(true);
    const errorOnValidate = validateLogin();

    if(errorOnValidate) return setLoading(false);

    try {
      await userLogin(login, password);
    } catch(error) {
      setErrorText(error);
      setDisplayErrorModal(true);
      setLoading(false);
    }
  }

  function validateLogin() {
    let haveError = false;

    if(!login) {
      haveError = true;
      setErrorText('Login is a required field');
      setDisplayErrorModal(true);
    }else if(!password) {
      haveError = true;
      setErrorText('Password is a required field');
      setDisplayErrorModal(true);
    }

    return haveError;
  }

  return(
    <Box show={showLogin}>
      <InputContainer>
        <CloseButton
        onClick={() => setDisplay(false)}
        >x</CloseButton>
        <Title>Login</Title>

        <InputGroup>
          <Label>Login</Label>
          <Input
            placeholder="Input your login nick"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
          <Label>Password</Label>
          <Input
            placeholder="Your password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            color='#575757'
            onClick={handleLogin}
          >
            { loading ? 'Loading...' : 'Login' }
          </Button>
        </InputGroup>
      </InputContainer>

      <ErrorModal
        errorText={errorText}
        showErrorModal={displayErrorModal}
        displayErrorModal={setDisplayErrorModal}
      />
    </Box>
    );
  }
  