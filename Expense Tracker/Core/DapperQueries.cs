namespace Expense_Tracker.Core;

public static class DapperQueries
{
    public static string TransactionIncomeAnalysis(Guid UserId,string StartDate,string EndDate)
    {
        return @"select max(amount) as Maximum,
		                 min(amount) as Minimum,
		                 avg(amount) as Average 
	              from incomes where userid = @UserId";
    }
}
