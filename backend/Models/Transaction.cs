namespace ControleGastos.Models;

public class Transaction {
    public int Id { get; set; }
    public string Description { get; set; } = "";
    public decimal Value { get; set; }
    public TransactionType Type { get; set; }
    public int PersonId { get; set; }
    public Person Person { get; set; } = null!;
}