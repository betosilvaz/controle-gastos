import { useLoaderData } from "@tanstack/react-router";

import styles from "./Totais.module.css";

interface TotaisPessoa {
  id: number;
  name: string;
  income: number;
  expense: number;
  balance: number;
}

interface Totais {
  persons: TotaisPessoa[];
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
}

export default function Totais() {
  const totais: Totais = useLoaderData({from: "/totais/",})

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Dashboard - Totais</h1>
        </div>
      </header>
      <main className="container">
        <section className={styles.cards}>
          <div className={styles.card}>
            <span className={styles.cardTitle}>Entradas</span>
            <strong className={styles.income}>
              R$ {totais.totalIncome.toFixed(2)}
            </strong>
          </div>

          <div className={styles.card}>
            <span className={styles.cardTitle}>Despesas</span>
            <strong className={styles.expense}>
              R$ {totais.totalExpense.toFixed(2)}
            </strong>
          </div>

          <div className={styles.card}>
            <span className={styles.cardTitle}>Saldo</span>
            <strong
              className={
                totais.totalBalance >= 0
                  ? styles.positive
                  : styles.negative
              }
            >
              R$ {totais.totalBalance.toFixed(2)}
            </strong>
          </div>

        </section>

        {totais.persons.length === 0 ? (
          <div className={styles.empty}>
            Nenhuma pessoa cadastrada.
          </div>
        ) : (
          <table className={styles.table}>
            <tr>
              <th>ID</th>
              <th>Pessoa</th>
              <th>Entradas</th>
              <th>Despesas</th>
              <th>Saldo</th>
            </tr>
            {totais.persons.map((person) => (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.name}</td>
                <td className={styles.income}>R$ {person.income.toFixed(2)}</td>
                <td className={styles.expense}>R$ {person.expense.toFixed(2)}</td>
                <td className={person.balance >= 0 ? styles.positive : styles.negative}>R$ {person.balance.toFixed(2)}</td>
              </tr>
            ))}
          </table>
        )}
      </main>
    </>
  );
}