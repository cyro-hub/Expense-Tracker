namespace Expense_Tracker.Core;

public class DapperDataAccess
{
    private readonly IConfiguration _configuration;

    public DapperDataAccess(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<List<T>> LoadData<T, U>(string StoredProcedure, U Parameters)
    {
        using (IDbConnection connection = new MySqlConnection(_configuration.GetSection("ConnectionStrings:Default").Value))
        {
            var rows = await connection.QueryAsync<T>(StoredProcedure,Parameters,commandType:CommandType.StoredProcedure);

            return rows.ToList();
        }
    }

    public async Task SaveData<T>(string StoredProcedure, T Parameters)
    {
        using (IDbConnection connection = new MySqlConnection(_configuration.GetSection("ConnectionStrings:Default").Value))
        {
            await connection.ExecuteAsync(StoredProcedure, Parameters, commandType: CommandType.StoredProcedure);
        }
    }
}
