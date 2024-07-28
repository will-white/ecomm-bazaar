import { createFileRoute } from '@tanstack/react-router';
import { memo } from 'react';

const LayoutComponent = () => {
  return (
    <div>
      <div>Index</div>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: memo(LayoutComponent),
});
