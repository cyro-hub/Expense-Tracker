namespace Expense_Tracker.Models.IncomeModel;

public class IncomeDTO
{
    public decimal Amount { get; set; }
    public Guid CategoryId { get; set; }
    public string Currency { get; set; }
    public DateTime CreatedAt { get; set; }
    public Guid UserId { get; set; }
}
