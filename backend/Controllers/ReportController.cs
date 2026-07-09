namespace ControleGastos.Controllers;

using Microsoft.AspNetCore.Mvc;
using ControleGastos.DTOs;
using ControleGastos.Services;
using ControleGastos.Models;

[ApiController]
[Route("api/reports")]
public class ReportController : ControllerBase {

    private readonly ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    [HttpGet]
    public async Task<IActionResult> List() {
        try {
            ReportDto response = await reportService.List();
            return Ok(response);
        } catch(Exception e) {
            return BadRequest(e.Message);
        }
    }

}