public class PersonRepository : IPersonRepository {
    private readonly AppDbContext context;

    public PersonRepository(AppDbContext context) {
        this.context = context;
    }

    public async Task Add(Person person) {
        context.Persons.Add(person);
        await context.SaveChangesAsync();
    }

    public async Task<List<Person>> FindAll() {
        return await context.Persons.ToListAsync();
    }

    public async Task<Person?> FindById(int id) {
        return await context.Persons.FindAsync(id);
    }

    public async Task Delete(Person person) {
        context.Persons.Remove(person);
        await context.SaveChangesAsync();
    }
}