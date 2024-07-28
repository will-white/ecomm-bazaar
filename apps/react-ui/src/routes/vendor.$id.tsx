import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/vendor/$id')({
  params: {
    parse: (params: Record<string, string>) => ({
      id: z.number().int().parse(Number(params.id)),
    }),
    stringify: ({ id }) => ({ id: `${id}` }),
  },
  component: LayoutComponent,
});

function LayoutComponent() {
  const params = Route.useParams();

  return (
    <div>
      <div>This is a profile for: {params.id}</div>
    </div>
  );
}
