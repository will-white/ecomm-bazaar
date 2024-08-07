import './index.css';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  ErrorComponent,
  RouterProvider,
  createRouter,
} from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserProvider from './common/providers/user-provider';
import pendingSpinner from './components/pendingSpinner';

export const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPendingComponent: pendingSpinner,
  defaultPendingMs: 10,
  defaultErrorComponent: ({ error }: { error: unknown }) => (
    <ErrorComponent error={error} />
  ),
  context: {
    auth: undefined!, // We'll inject this when we render
    queryClient,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>,
);
