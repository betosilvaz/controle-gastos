import { useLoaderData } from "@tanstack/react-router";


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

export default function Pessoas() {
  const pessoas: Pessoa[] = useLoaderData({ from: '/pessoas/' })

  return (
    <>
      {pessoas.map((pessoa) => (
        <div key={pessoa.id}>
          <h2>{pessoa.name}</h2>
          <p>Age: {pessoa.age}</p>
          <h3>Transactions</h3>
          <ul>
            {pessoa.transactions.map((transaction) => (
              <li key={transaction.id}>
                <p>{transaction.description}</p>
                <p>Value: {transaction.value}</p>
                <p>Type: {transaction.type}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}