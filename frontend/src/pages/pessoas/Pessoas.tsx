import { useLoaderData } from "@tanstack/react-router";
import styles from './Pessoas.module.css'

import { useState } from "react";
import toast from 'react-hot-toast'

interface Pessoa {
  id: number;
  name: string;
  age: number;
  transactions: Transaction[];
}

interface Transaction {
  id: number;
  description: string;
  value: number;
  type: number;
}

interface Form {
  name: string;
  age: number;
}

export default function Pessoas() {
  const [formOpen, setFormOpen] = useState<boolean>(false)
  const [form, setForm] = useState<Form>({
    name: '',
    age: 0
  })
  const pessoas: Pessoa[] = useLoaderData({ from: '/pessoas/' })

  const addUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch(`http://localhost:5014/api/persons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      if (!response.ok) {
        throw new Error("Não foi possível adicionar um novo usuário")
      }

      toast.success("Usuário adicionado com sucesso!")

      setForm({
        name: '',
        age: 0
      })

      setFormOpen(false)

    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message)
      }
    }
  }

  const deleteUser = async (e) => {
    try {
      const response = await fetch(`http://localhost:5014/api/persons/${e.target.dataset.id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error("Não foi possível apagar o usuário")
      toast.success("Usuário excluido com sucesso!")
    } catch (e: unknown) {
      if (e instanceof Error)
        toast.error(e.message)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value
    }))
  }

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Dashboard - Pessoas</h1>
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
          <form onSubmit={addUser} className={styles.form}>
            <input className={styles.formItem} type="text" placeholder="Nome" name="name" value={form.name} onChange={handleChange}/>
            <input className={styles.formItem} type="number" placeholder="Idade" name="age" value={form.age} onChange={handleChange}/>
            <button className={styles.formSubmit} type="submit">Concluir</button>
            <button className={styles.formCancel} type="button" onClick={() => setFormOpen(false)}>Fechar</button>
          </form>
        )}

        {pessoas.length <= 0 && (
          <div className={styles.emptyList}>
            <span>Nenhuma pessoa cadastrada no sistema</span>
          </div>
        )}

        {pessoas.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th>Nome</th>
                <th>Idade</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {pessoas.map(p => (
                <tr key={p.id} className={styles.tableItem}>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td><button className={styles.deleteButton} onClick={deleteUser} data-id={p.id}>Excluir</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  )
}