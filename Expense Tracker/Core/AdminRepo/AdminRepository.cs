using Expense_Tracker.Models.UserModel;

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

           /* parameters.Add("@UserId",Id);
            parameters.Add("@StartDate", DateTime.Parse(from));
            parameters.Add("@EndDate", DateTime.Parse(to));*/

            string Query = """
                select sum(CASE WHEN type = 'Out' THEN Amount ELSE 0 END) as outcome,
                       sum(CASE WHEN type = 'In' THEN Amount ELSE 0 END) as income,
                	   Fullmonth 
                from transactions 
                where Userid=@UserId and 
                CreatedAt >= @StartDate and CreatedAt <= @EndDate
                group by Fullmonth;
                """;

            var result = await _DataAccess.LoadData<Report, dynamic>(Query,new {UserId=Id,StartDate=from,EndDate=to});

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
    public async Task<Responses<Analysis>> TransactionAnalysis(Guid Id, string from, string to)
    {
        try
        {
            string Query = """
                select max(CASE WHEN type = 'Out' THEN Amount END) as outmax,
                       min(CASE WHEN type = 'Out' THEN Amount END) as outmin,
                       avg(CASE WHEN type = 'Out' THEN Amount END) as outavg,
                       max(CASE WHEN type = 'In' THEN Amount END) as inMax,
                	   min(CASE WHEN type = 'In' THEN Amount END) as inMin,
                	   avg(CASE WHEN type = 'In' THEN Amount END) as inavg,
                       sum(CASE WHEN type = 'Out' THEN Amount END) as outtotal,
                       sum(CASE WHEN type = 'In' THEN Amount END) as intotal
                from Transactions
                where Userid=@UserId and 
                	  CreatedAt >= @StartDate and 
                	  CreatedAt <= @EndDate
                """;

            var result = await _DataAccess.LoadData<Analysis, dynamic>(Query, new { UserId = Id, StartDate = from, EndDate = to });
            
            return (new Responses<Analysis>
            {
                StatusCode = 200,
                StatusMessage = "successful Operation",
                Data = result[0],
                IsSuccess = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting sp_transaction_analysis", typeof(AdminRepository));

            return new Responses<Analysis>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Error getting sp_transaction_analysis"
            };
        }
    }


}
