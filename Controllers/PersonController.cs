namespace ControleGastos.Controllers;

using Microsoft.AspNetCore.Mvc;
using ControleGastos.DTOs;
using ControleGastos.Services;
using ControleGastos.Models;

[ApiController]
[Route("api/persons")]
public class PersonController : ControllerBase {

    private readonly PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreatePersonDto dto) {
        try {
            await personService.Create(dto);
            return Created();
        } catch (Exception e) {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    public async Task<IActionResult> List() {
        try {
            List<Person> persons = await personService.List();
            return Ok(persons);
        } catch (Exception e) {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id) {
        try {
            await personService.Delete(id);
            return NoContent();
        } catch (Exception e) {
            return BadRequest(e.Message);
        }
    }
}