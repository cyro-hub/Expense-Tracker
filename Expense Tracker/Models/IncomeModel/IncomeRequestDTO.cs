namespace Expense_Tracker.Models.IncomeModel;

public class IncomeRequestDTO
{
    public Guid Id { get; set; }
    public decimal Amount { get; set; }
    public DateTime CreatedAt { get; set; }
    public Guid CategoryId { get; set; }
    public string Currency { get; set; }
    public Guid UserId { get; set; }
}
