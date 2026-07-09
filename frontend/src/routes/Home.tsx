import styles from './Home.module.css'

import { Link } from '@tanstack/react-router'

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Controle de Gastos</h1>
        </div>
      </header>
      <main className="container">
        <nav className={styles.navigation}>
          <Link to="/pessoas">
            <span className={styles.linkTitle}>Ver pessoas</span>
            <span className={styles.linkBody}>Gerencie pessoas, adicione novas, veja informações</span>
          </Link>
          <Link to="/transacoes">
            <span className={styles.linkTitle}>Ver transações</span>
            <span className={styles.linkBody}>Visualize e gerencie suas transações financeiras</span>
          </Link>
          <Link to="/totais">
            <span className={styles.linkTitle}>Ver totais</span>
            <span className={styles.linkBody}>Acesse os totais de receitas e despesas</span>
          </Link>
        </nav>
      </main>
    </>
  )
}
