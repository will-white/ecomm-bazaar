import { Tabs, Tab } from '@mui/material';
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from '@tanstack/react-router';
import { memo } from 'react';

const UserLayout = () => {
  const { pathname } = useLocation();
  const relativePath = pathname.replace('/user', '').replace('/', '');

  return (
    <>
      <div className="max-w-5xl mx-auto pt-4">
        {/* TODO: Add hover highlight */}
        <Tabs
          aria-label="User account and profile settings navigation"
          role="navigation"
          value={relativePath}
          variant="fullWidth"
        >
          <Tab
            component={Link}
            from="user"
            label="Account Info"
            to="."
            value=""
          />
          <Tab
            component={Link}
            from="user"
            label="Security"
            to="security"
            value="security"
          />
          <Tab
            component={Link}
            from="user"
            label="Privacy"
            to="privacy"
            value="privacy"
          />
          <Tab
            component={Link}
            from="user"
            label="Addresses"
            to="addresses"
            value="addresses"
          />
          <Tab
            component={Link}
            from="user"
            label="Payment Info"
            to="payments"
            value="payments"
          />
        </Tabs>
        <div className="pt-8">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export const Route = createFileRoute('/user')({
  component: memo(UserLayout),
});

export default UserLayout;
