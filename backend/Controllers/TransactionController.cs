namespace ControleGastos.Controllers;

using ControleGastos.DTOs;
using ControleGastos.Services;
using ControleGastos.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/transactions")]
public class TransactionController : ControllerBase {
    private readonly TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateTransactionDto dto) {
        try {
            await transactionService.Create(dto);
            return Created();
        } catch (Exception e) {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    public async Task<IActionResult> List() {
        try {
            List<Transaction> transactions = await transactionService.List();

            var response = transactions.Select(t => new TransactionResponseDto {
                Id = t.Id,
                Description = t.Description,
                Value = t.Value,
                Type = t.Type,
                Person = new TransactionPersonResponseDto {
                    Id = t.Person.Id,
                    Name = t.Person.Name,
                    Age = t.Person.Age
                }
            });

            return Ok(response);
        } catch (Exception e) {
            return BadRequest(e.Message);
        }
    }
}