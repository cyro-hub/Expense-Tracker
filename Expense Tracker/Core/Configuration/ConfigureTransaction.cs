using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Expense_Tracker.Core.Configuration;
public class ConfigureTransaction : IEntityTypeConfiguration<Transaction>
{
    public void Configure(EntityTypeBuilder<Transaction> builder)
    {
        builder.Property(b => b.Type).HasConversion(c => c.ToString(), c => Enum.Parse<Types>(c));
    }
}
