import React, { useState, useEffect } from 'react';

import { useAuth } from '../../contexts/auth';

import {
  Box, InputContainer, CloseButton, Title,
  InputGroup, Label, Input, Button
} from '../styles/modal.styles';

import { ErrorLabel } from './styles';

export default function EditModal({ 
  showEditModal, displayEditModal, userLogged 
}) {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [message, setMessage] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const { updateUser } = useAuth();

  useEffect(() => {
    setName(userLogged.name);
    setLogin(userLogged.login);
    setMessage(userLogged.message ? userLogged.message : '');
  }, [userLogged]);

  async function handleEdit() {
    const errorOnValidate = validateEdit();

    if(errorOnValidate) return;

    try {
      if(name === userLogged.name && login === userLogged.login && message === userLogged.message) {
        displayEditModal(false);
        return;
      }

      await updateUser(name, login, message);
      displayEditModal(false);
    } catch(error) {
      throw error;
    }
  }

  function validateEdit() {
    let haveError = false;
    setErrorName(false);
    setErrorLogin(false);

    if(!name) {
      haveError = true;
      setErrorName(true);
    } 

    if(!login){
      haveError = true;
      setErrorLogin(true);
    }

    return haveError;
  }

  return(
    <Box show={showEditModal}>
      <InputContainer>
        <CloseButton
          onClick={() => displayEditModal(false)}
        >x</CloseButton>
        <Title>Edit Profile</Title>

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
            placeholder="Login"
            error={errorLogin} 
            value={login}
            onChange={e => setLogin(e.target.value)}  
          />
          <ErrorLabel show={errorLogin}>Login is a required field.</ErrorLabel>

          <Label>Message</Label>
          <Input 
            placeholder="Status"
            value={message}  
            onChange={e => setMessage(e.target.value)}
          />

          <Button 
            color="#575757"
            onClick={handleEdit}  
          >Edit</Button>
        </InputGroup>
      </InputContainer>
    </Box>
  );
}
