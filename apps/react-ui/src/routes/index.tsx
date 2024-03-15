import { Button } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import usersService from '../common/services/users-service';

export const Route = createFileRoute('/')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div>
      <div>Index</div>
      // eslint-disable-next-line react/jsx-no-bind
      <Button onClick={async () => await usersService.getMe()} type="button">
        Press me!
      </Button>
    </div>
  );
}
