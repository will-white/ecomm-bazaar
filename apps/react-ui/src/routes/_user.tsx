import { createFileRoute, Outlet } from '@tanstack/react-router';
import { memo } from 'react';

const UserLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export const Route = createFileRoute('/_user')({
  component: memo(UserLayout),
});

export default UserLayout;
