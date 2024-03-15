import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/user/privacy')({
  component: () => <div>Hello /user/privacy!</div>,
});
