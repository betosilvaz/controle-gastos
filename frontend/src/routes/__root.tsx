import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Toaster } from 'react-hot-toast'

export const Route = createRootRoute({
  component: () => (
    <>
      <Toaster/>
      <HeadContent />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})