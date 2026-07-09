namespace ControleGastos.Services;

using Microsoft.EntityFrameworkCore;
using ControleGastos.Data;
using ControleGastos.DTOs;
using ControleGastos.Models;

public class ReportService {
    private readonly AppDbContext context;

    public ReportService(AppDbContext context) {
        this.context = context;
    }

    public async Task<ReportDto> List() {
        var personReports = await context.Persons.Select(p => new PersonReportDto {
            Id = p.Id,
            Name = p.Name,
            Income = p.Transactions.Where(t => t.Type == TransactionType.Income).Sum(t => (decimal?)t.Value) ?? 0,
            Expense = p.Transactions.Where(t => t.Type == TransactionType.Expense).Sum(t => (decimal?)t.Value) ?? 0
        }).ToListAsync();

        var totalIncome = personReports.Sum(r => r.Income);
        var totalExpense = personReports.Sum(r => r.Expense);
        var totalBalance = totalIncome - totalExpense;

        ReportDto report = new ReportDto {
            Persons = personReports,
            TotalIncome = totalIncome,
            TotalExpense = totalExpense
        };

        return report;
    }
}