namespace ControleGastos.Controllers;

using ControleGastos.DTOs;

[ApiController]
[Route("api/persons")]
public class PersonController : ControllerBase {
    [HttpPost]
    public async Task<IActionResult> Create(CreatePersonDto dto) {

    }

    [HttpGet]
    public async Task<IActionResult> List() {

    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id) {

    }
}