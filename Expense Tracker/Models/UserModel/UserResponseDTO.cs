namespace Expense_Tracker.Models.UserModel;

public class UserResponseDTO
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Currency { get; set; }
    public Guid Id { get; set; }
    public decimal Balance { get; set; }
}
