namespace ControleGastos.DTOs;

public class ReportDto {
    public List<PersonReportDto> Persons { get; set; } = [];
    public decimal TotalIncome { get; set; }
    public decimal TotalExpense { get; set; }
    public decimal TotalBalance => TotalIncome - TotalExpense;
}