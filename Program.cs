using Microsoft.EntityFrameworkCore;
using ControleGastos.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options => {
    options.UseSqlite(builder.Configuration.GetConnectionString("Default"));
});

builder.Services.AddScoped<IPersonRepository, PersonRepository>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();

builder.Services.AddScoped<PersonService>();
builder.Services.AddScoped<TransactionService>();

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
    app.MapOpenApi();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();