public interface ITransactionRepository {
    Task Add(Transaction transaction);
    Task<List<Transaction>> FindAll();
    Task<Transaction?> FindById(int id);
}