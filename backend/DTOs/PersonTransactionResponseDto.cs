namespace ControleGastos.DTOs;

using ControleGastos.Models;

public class PersonTransactionResponseDto {
    public int Id { get; set; }
    public string Description { get; set; } = "";
    public decimal Value { get; set; }
    public TransactionType Type { get; set; }
}