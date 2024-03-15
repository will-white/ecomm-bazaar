import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/user/profile')({
  component: () => <div>Hello /user/profile!</div>,
});
