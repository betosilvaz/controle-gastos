namespace ControleGastos.Controllers;

using ControleGastos.DTOs;

[ApiController]
[Route("api/transactions")]
public class TransactionController : ControllerBase {
    [HttpPost]
    public async Task<IActionResult> Create(CreateTransactionDto dto) {

    }

    [HttpGet]
    public async Task<IActionResult> List() {

    }
}