namespace Expense_Tracker.Models.TransactionModel;

public class TransactionDTO
{
    public decimal Amount { get; set; }
    public Guid CategoryId { get; set; }
    public string Currency { get; set; }
    public DateTime CreatedAt { get; set; }
    public User User { get; set; }
}
