import React from 'react';
import UserContext from '../../UserContext';

import { Outlet, Navigate } from 'react-router-dom'

interface ProtectedRoutesProps {
  redirectPath: string;
  isAllowed: boolean
}

export const ProtectedRoutes = ({ redirectPath, isAllowed }: ProtectedRoutesProps) => {
  const { login } = React.useContext(UserContext)

  if (login === null) return null
  return isAllowed ? <Outlet /> : <Navigate to={redirectPath} />
}
