namespace Expense_Tracker.Models.TransactionModel;

public class Transaction
{
    [Key]
    public Guid Id { get; set; }
    [Required, Column(TypeName = "decimal(15,2)")]
    public decimal Amount { get; set; }
    public DateTime CreatedAt { get; set; }
   /* [Required]
    [JsonIgnore]
    public Guid CategoryId { get; set; }*/
    public Category Category { get; set; }
    [Required]
    public string Currency { get; set; }
    [JsonIgnore]
    public User User { get; set; }/*
    [Required]
    [JsonIgnore]
    public Guid UserId { get; set; }*/
    [MaxLength(15)]
    public string FullMonth { get; set; }
    public Types Type { get; set; }
}
