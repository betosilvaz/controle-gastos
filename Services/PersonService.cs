namespace ControleGastos.Services;

using ControleGastos.DTOs;
using ControleGastos.Models;
using ControleGastos.Repositories;

public class PersonService {
    private readonly IPersonRepository personRepository;

    public PersonService(IPersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public async Task Create(CreatePersonDto dto) {
        if (string.IsNullOrWhiteSpace(dto.Name) || string.IsNullOrWhiteSpace(dto.Age))
            throw new Exception("Todos os campos devem ser preenchidos.");

        var person = new Person {
            Name = dto.Name,
            Age = dto.Age
        };

        await personRepository.Add(person);
    }

    public async Task<List<Person>> List() {
        return await List<Person> persons = personRepository.FindAll();
    }

    public async Task Delete(int personId) {
        var person = await personRepository.findById(personId);

        if (person == null)
            throw new Exception("Não existe usuário com este Id.")

        await personRepository.Delete(person);
    }
}