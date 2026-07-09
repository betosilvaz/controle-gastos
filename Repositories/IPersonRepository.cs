public interface IPersonRepository {
    Task Add(Person person);
    Task<List<Person>> FindAll();
    Task<Person?> FindById(int id);
    Task Delete(Person person);
}