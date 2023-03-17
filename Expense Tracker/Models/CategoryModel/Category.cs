namespace Expense_Tracker.Models.OptionModel;

[Index(nameof(Name), IsUnique = true)]
public class Category
{
    [Key] 
    public Guid Id { get; set; }
    [Required, MaxLength(300)]
    public string Name { get; set; }
    [Required]
    [JsonIgnore]
    public Guid UserId { get; set; }
    [JsonIgnore]
    public User User { get; set; }
}
