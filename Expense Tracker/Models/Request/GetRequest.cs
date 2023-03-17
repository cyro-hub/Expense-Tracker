namespace Expense_Tracker.Models.Request;

public class GetRequest
{
    public int CurrentPage { get; set; }
    public string QueryString { get; set; }
    public Guid UserId { get; set; }
}
