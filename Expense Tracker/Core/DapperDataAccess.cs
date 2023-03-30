using Microsoft.Data.SqlClient;

namespace Expense_Tracker.Core;

public class DapperDataAccess
{
    private readonly IConfiguration _configuration;

    public DapperDataAccess(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<List<T>> LoadData<T, U>(string Query, U Parameters)
    {
        using (IDbConnection connection = new SqlConnection(_configuration.GetSection("ConnectionStrings:Default").Value))
        {
            var rows = await connection.QueryAsync<T>(Query,Parameters);

            return rows.ToList();
        }
    }

    public async Task SaveData<T>(string Query, T Parameters)
    {
        using (IDbConnection connection = new SqlConnection(_configuration.GetSection("ConnectionStrings:Default").Value))
        {
            await connection.ExecuteAsync(Query, Parameters);
        }
    }
}
