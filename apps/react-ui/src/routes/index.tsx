import { Button } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import usersService from '../common/services/users-service';
import { memo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

const LayoutComponent = () => {
  const { refetch } = useQuery({
    queryKey: ['me'],
    queryFn: () => usersService.getMe(),
  });
  const handleClick = useCallback(() => void refetch(), [refetch]);

  return (
    <div>
      <div>Index</div>
      <Button onClick={handleClick} type="button">
        Press me!
      </Button>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: memo(LayoutComponent),
});
