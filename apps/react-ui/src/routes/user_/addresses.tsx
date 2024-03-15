import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/addresses')({
  component: () => <div>Hello /user/addresses!</div>
})