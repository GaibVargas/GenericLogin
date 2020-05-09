import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useAuth } from '../contexts/auth';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

export default function Routes() {
  const { signed } = useAuth();

  return(
    <BrowserRouter>
      { signed ? <AppRoutes /> : <AuthRoutes /> }
    </BrowserRouter>
  );
}
