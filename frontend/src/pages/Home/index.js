import React, { useState } from 'react';
import { FaUserEdit, FaSignOutAlt } from 'react-icons/fa';

import { useAuth } from '../../contexts/auth';
import EditModal from '../../components/EditModal';

import { Container, User, UserHeader, UserName, ButtonContainer, Button, UserStatus } from './styles';

export default function Home() {
  const [displayEditModal, setDisplayEditModal] = useState(false);

  const { logout, user, deleteUser } = useAuth();

  return(
    <Container>
      <User>
        <UserHeader>
          <UserName>{user.name}</UserName>
          <ButtonContainer>
            <Button
              onClick={() => setDisplayEditModal(true)}
            >
              <FaUserEdit size={25} />
            </Button>
            <Button
              onClick={() => logout()}
            >
              <FaSignOutAlt size={25} />
            </Button>
          </ButtonContainer>
        </UserHeader>

        { user.message && (
          <UserStatus>{user.message}</UserStatus>
        ) }

        <button onClick={() => deleteUser()}>Excluir usuário</button>
      </User>

      <EditModal
        showEditModal={displayEditModal}
        displayEditModal={setDisplayEditModal}
        userLogged={user}
      />
    </Container>
  );
}
