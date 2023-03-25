namespace Expense_Tracker.Core.AdminRepo;

public class AdminRepository
{
    private readonly ILogger _logger;
    private readonly DapperDataAccess _DataAccess;

    public AdminRepository(ILogger logger,IConfiguration configuration)
    {
        _logger = logger;
        _DataAccess = new DapperDataAccess(configuration);
    }


    public async Task<Responses<List<Report>>> TransactionReport(Guid Id,string from ,string to)
    {
        try
        {
            var parameters = new DynamicParameters();

            parameters.Add("@UserId",Id);
            parameters.Add("@StartDate", DateTime.Parse(from));
            parameters.Add("@EndDate", DateTime.Parse(to));

            var result = await _DataAccess.LoadData<Report, DynamicParameters>("sp_transaction_to_income_comparison",parameters);

            return (new Responses<List<Report>>
            {
                StatusCode = 200,
                StatusMessage = "successful Operation",
                Data = result,
                IsSuccess = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting sp_transaction_to_income_comparison", typeof(AdminRepository));

            return new Responses<List<Report>>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Error getting sp_transaction_to_income_comparison"
            };
        }
    }
    public async Task<Responses<List<Analysis>>> TransactionAnalysis(Guid Id, string From, string To)
    {
        try
        {

            return (new Responses<List<Analysis>>
            {
                StatusCode = 200,
                StatusMessage = "successful Operation",
               /* Data = result1,*//*result1.Concat(result2).ToList(),*/
                IsSuccess = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting sp_transaction_analysis", typeof(AdminRepository));

            return new Responses<List<Analysis>>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Error getting sp_transaction_analysis"
            };
        }
    }


}
