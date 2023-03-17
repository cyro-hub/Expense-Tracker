namespace Expense_Tracker.Models.Response;

public class TransactionResponse
{
    public decimal Amount { get; set; }
    public string FullMonth { get; set; }
    public DateOnly CreatedAt { get; set; }
}
