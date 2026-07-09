import { createFileRoute } from '@tanstack/react-router'
import Home from './Home'

export const Route = createFileRoute('/')({
  head: ()=> ({
    meta: [{ title: 'Página inicial' }]
  }),
  component: Home,
})

