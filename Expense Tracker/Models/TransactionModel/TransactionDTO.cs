namespace Expense_Tracker.Models.TransactionModel;

public class TransactionDTO
{
    public Guid Id { get; set; }
    public decimal Amount { get; set; }
    public Guid? CategoryId { get; set; }
    public string Currency { get; set; }
    public DateTime CreatedAt { get; set; }
    public Guid? UserId { get; set; }
}
