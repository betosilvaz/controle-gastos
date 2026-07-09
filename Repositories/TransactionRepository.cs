namespace ControleGastos.Repositories;

using ControleGastos.Data;
using ControleGastos.Models;
using Microsoft.EntityFrameworkCore;

public class TransactionRepository : ITransactionRepository {
    private readonly AppDbContext context;

    public TransactionRepository(AppDbContext context) {
        this.context = context;
    }

    public async Task Add(Transaction transaction) {
        context.Transactions.Add(transaction);
        await context.SaveChangesAsync();
    }

    public async Task<List<Transaction>> FindAll() {
        return await context.Transactions.ToListAsync();
    }

    public async Task<Transaction?> FindById(int id) {
        return await context.Transactions.FindAsync(id);
    }
}