namespace Expense_Tracker.Models.CategoryModel;

public class CategoryRequestDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public Guid UserId { get; set; }
}
