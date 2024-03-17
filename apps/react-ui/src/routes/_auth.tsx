import { createFileRoute, Outlet } from '@tanstack/react-router';
import { memo } from 'react';

const AuthLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export const Route = createFileRoute('/_auth')({
  component: memo(AuthLayout),
});

export default AuthLayout;
