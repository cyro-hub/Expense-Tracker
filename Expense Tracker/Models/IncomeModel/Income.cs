namespace Expense_Tracker.Models.IncomeModel;

public class Income
{
    [Key]
    public Guid Id { get; set; }
    [Required, Column(TypeName = "decimal(15,2)")]
    public decimal Amount { get; set; }
    public DateTime CreatedAt { get; set; }
    [Required]
    [JsonIgnore]
    public Guid CategoryId { get; set; }
    [Required]
    public Category Category { get; set; }
    [JsonIgnore]
    public User User { get; set; }
    public string Currency { get; set; }
    [Required]
    [JsonIgnore]
    public Guid UserId { get; set; }
    [MaxLength(15)]
    public string? FullMonth { get; set; }
}
