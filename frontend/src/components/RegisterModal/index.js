import React, { useState } from 'react';

import  { useAuth } from '../../contexts/auth';
import ErrorModal from '../ErrorModal';

import {
  Box, InputContainer, CloseButton, Title,
  InputGroup, Label, Input, Button
} from '../styles/modal.styles';

import { ErrorLabel } from './styles';

export default function RegisterModal({ showRegister, setDisplay }) {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [displayErrorModal, setDisplayErrorModal] = useState(false);
  const [errorText, setErrorText] = useState('Teste');
  const [loading, setLoading] = useState(false);

  const { userRegister } = useAuth();

  async function handleRegister() {
    setLoading(true);
    const errorOnValidate = validateRegister();

    if(errorOnValidate) return;

    try {
      await userRegister(name, login, password);
    } catch(error) {
      setErrorText(error);
      setDisplayErrorModal(true);
      setLoading(false);
    }
  }

  function validateRegister() {
    let haveError = false;
    setErrorName(false);
    setErrorLogin(false);
    setErrorPassword(false);

    if(!name){
      setErrorName(true);
      haveError = true;
    }
    if(!login){
      setErrorLogin(true);
      haveError = true; 
    }
    if(password.length < 5){
      setErrorPassword(true);
      haveError = true;
    }

    return haveError;
  }

  return(
    <Box show={showRegister}>
      <InputContainer>
        <CloseButton
        onClick={() => setDisplay(false)}
        >x</CloseButton>
        <Title>Register</Title>

        <InputGroup>
          <Label>Name</Label>
          <Input
            placeholder="Name"
            error={errorName}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <ErrorLabel show={errorName}>Name is a required field.</ErrorLabel>
          
          <Label>Login</Label>
          <Input
            placeholder="Input your login nick"
            error={errorLogin}
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
          <ErrorLabel show={errorLogin}>Login is a required field.</ErrorLabel>
          
          <Label>Password</Label>
          <Input
            placeholder="Password (5 characters or more)"
            type="password"
            error={errorPassword}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <ErrorLabel show={errorPassword}>A password must have 8 characters or more.</ErrorLabel>
          
          <Button
            color='#575757'
            onClick={handleRegister}
          >
            { loading ? 'Loading...' : 'Register' }
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
