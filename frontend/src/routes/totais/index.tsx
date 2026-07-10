import { createFileRoute } from '@tanstack/react-router'

import Totais from '@pages/totais/Totais'

export const Route = createFileRoute('/totais/')({
  head: () => ({
    meta: [{ title: 'Dashboard - Totais' }]
  }),
  loader: async() => fetchTotais(), 
  component: Totais,
})

async function fetchTotais() {
  try {
    const response = await fetch(`http://localhost:5014/api/reports`)
    if (!response.ok) throw new Error("Não foi possível recuperar o relatório")
    const data = await response.json()
    return data
  } catch (e) {
    console.log(e.message)
  }
}