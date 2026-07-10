import { createFileRoute } from '@tanstack/react-router'
import Pessoas from './Pessoas'

export const Route = createFileRoute('/pessoas/')({
  head: () => ({
    meta: [{ title: 'Pessoas' }]
  }),
  loader: async () => fetchPessoas(),
  component: Pessoas,
})

async function fetchPessoas() {
  try {
    const response = await fetch('http://localhost:5014/api/persons');
    if (!response.ok) throw new Error('Failed to fetch pessoas');
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}