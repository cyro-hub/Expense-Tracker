namespace Expense_Tracker.Models.OptionModel;


public class Category
{
    [Key] 
    public Guid Id { get; set; }
    [Required, MaxLength(300)]
    public string Name { get; set; }
    public Types Type { get; set; }
    public Guid? UserId { get; set; }
    [JsonIgnore]
    public User User { get; set; }
}
