using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Expense_Tracker.Core.Configuration;

public class ConfigureCategory : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.Property(b => b.Type).HasConversion(c => c.ToString(), c => Enum.Parse<Types>(c));
    }
}
