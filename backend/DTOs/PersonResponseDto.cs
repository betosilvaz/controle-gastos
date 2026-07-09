namespace ControleGastos.DTOs;

public class PersonResponseDto {
    public int Id {get; set; }
    public string Name { get; set; } = "";
    public int Age { get; set; }
    public List<PersonTransactionResponseDto> Transactions { get; set; } = [];
}

