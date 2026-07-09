namespace ControleGastos.DTOs;

public record CreateTransactionDto(
    string Description,
    decimal Value,
    TransactionType Type,
    int PersonId
);