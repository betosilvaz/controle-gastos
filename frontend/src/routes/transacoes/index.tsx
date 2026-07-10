import { createFileRoute } from '@tanstack/react-router'

import Transacoes from '@pages/transacoes/Transacoes'

export const Route = createFileRoute('/transacoes/')({
    head: () => ({
        meta: [{ title: 'Dashboard - Transações' }]
    }),
    loader: async() => fetchTransacoes(),
    component: Transacoes,
})

async function fetchTransacoes() {
    try {
        const response = await fetch(`http://localhost:5014/api/transactions`)
        if (!response.ok) throw new Error("Não foi possível recuperar as transações.")
        const data = await response.json()
        return data
    } catch (e) {
        console.log(e.message)
    }
}