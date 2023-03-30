namespace Expense_Tracker.Models.UserModel;

[Index(nameof(Email), IsUnique = true)]
public class User
{
    [Key]
    public Guid Id { get; set; }
    [Required,MaxLength(50)]
    public string Name { get; set; }
    [Required,MaxLength(100)]
    public string Email { get; set; }
    [Required]
    public byte[] PasswordHash { get; set; }
    [Required]
    public byte[] PasswordSalt { get; set; }
    [Required, MaxLength(50)]
    public string Currency { get; set; }
    [Column(TypeName = "decimal(15, 2)")]
    public decimal Balance { get; set; }
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime? RefreshTokenCreatedAt { get; set; } = DateTime.Now;
    public DateTime? RefreshTokenExpiresAt { get; set; } = DateTime.Now;
    public List<Category> Categories { get; set; }
}
