namespace ControleGastos.DTOs;

public class PersonReportDto {
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Income { get; set; }
    public decimal Expense { get; set; }
    public decimal Balance => Income - Expense;
}