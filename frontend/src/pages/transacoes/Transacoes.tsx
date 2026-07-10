import { useLoaderData, useRouter } from "@tanstack/react-router";
import { useState } from "react"
import toast from "react-hot-toast";

import styles from './Transacoes.module.css'

interface Transacao {
  id: number;
  description: string;
  value: number;
  type: number;
  person: Person;
}

interface Person {
  id: number;
  name: string;
  age: number;
}

interface Form {
  description: string;
  value: number;
  type: number;
  personId: number;
}

const initialFormState = {
  description: '',
  value: 0,
  type: 0,
  personId: 0
}

export default function Transacoes() {
  const router = useRouter()
  const [formOpen, setFormOpen] = useState<boolean>(false)
  const [form, setForm] = useState<Form>(initialFormState)
  const transacoes: Transacao[] = useLoaderData({ from: '/transacoes/' })

  const addTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch(`http://localhost:5014/api/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      if (!response.ok)
        throw new Error("Não foi possível adicionar uma nova transação.")

      toast.success("Transação adicionada com sucesso!")
      setForm(initialFormState)
      setFormOpen(false)
      router.invalidate()
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const isNumber = (name === "value" || name === "type" || name === "personId")
    setForm(prev => ({
      ...prev,
      [name]: isNumber ? Number(value) : value
    }))
  }

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Dashboard - Transações</h1>
        </div>
      </header>

      <main className="container">
        <section className={styles.actions}>
          <span className={styles.actionTitle}>Ações</span>
          <button className={styles.button} onClick={() => setFormOpen(true)}>
            Adicionar
          </button>
        </section>
        {formOpen && (
          <form onSubmit={addTransaction} className={styles.form}>
            <label htmlFor="description">Descrição</label>
            <textarea className={styles.formItem} id="descricao" placeholder="Descrição" name="description" value={form?.description} onChange={handleChange}></textarea>
            <label htmlFor="value">Valor</label>
            <input className={styles.formItem} id="value" type="number" placeholder="Valor" name="value" value={form?.value} onChange={handleChange} />
            <label htmlFor="personId">Pessoa ID</label>
            <input className={styles.formItem} id="personId" type="number" placeholder="Id da pessoa" name="personId" value={form?.personId} onChange={handleChange} />
            <label htmlFor="type">Tipo</label>
            <select className={styles.formItem} id="type" name="type" value={form?.type} onChange={handleChange}>
              <option value="0">Despesa</option>
              <option value="1">Entrada</option>
            </select>
            <button className={styles.formSubmit} type="submit">Concluir</button>
            <button className={styles.formCancel} type="button" onClick={() => setFormOpen(false)}>Fechar</button>
          </form>
        )}

        {transacoes?.length <= 0 && (
          <div className={styles.emptyList}>
            <span>Nenhuma transação cadastrada no sistema</span>
          </div>
        )}

        {transacoes?.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th>Id</th>
                <th>Descricao</th>
                <th>Valor</th>
                <th>Tipo</th>
                <th>Pessoa</th>
              </tr>
            </thead>

            <tbody>
              {transacoes.map(t => (
                <tr key={t.id} className={styles.tableItem}>
                  <td>{t.id}</td>
                  <td>{t.description}</td>
                  <td>{t.value}</td>
                  <td>{t.type == 0 ? "Despesa" : "Entrada"}</td>
                  <td>{t.person.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  )
}