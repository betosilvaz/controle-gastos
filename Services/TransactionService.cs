namespace ControleGastos.Services;

using ControleGastos.DTOs;
using ControleGastos.Models;
using ControleGastos.Repositories;

public class TransactionService
{
    private readonly ITransactionRepository transactionRepository;
    private readonly IPersonRepository personRepository;

    public TransactionService(ITransactionRepository transactionRepository, IPersonRepository personRepository) {
        this.transactionRepository = transactionRepository;
        this.personRepository = personRepository;
    }

    public async Task Create(CreateTransactionDto dto) {
        var person = await personRepository.FindById(dto.PersonId);

        if (person == null)
            throw new Exception("Pessoa não encontrada.");

        if (person.Age < 18 && dto.Type == TransactionType.Income)
            throw new Exception("Menores não podem cadastrar receitas.");

        var transaction = new Transaction {
            Description = dto.Description,
            Value = dto.Value,
            Type = dto.Type,
            PersonId = dto.PersonId
        };

        await transactionRepository.Add(transaction);
    }

    public async Task<List<Transaction>> List() {
        List<Transaction> transactions = await transactionRepository.FindAll();
        return transactions;
    }
}