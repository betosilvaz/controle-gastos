namespace ControleGastos.DTOs;

using ControleGastos.Models;

public record CreateTransactionDto(
    string Description,
    decimal Value,
    TransactionType Type,
    int PersonId
);