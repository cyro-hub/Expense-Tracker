using System.ComponentModel;

namespace Expense_Tracker.Core;

public class TrackerDbContext:DbContext
{
    public TrackerDbContext(DbContextOptions<TrackerDbContext> options):base (options)
    {
    }

  /*  protected override void ConfigureConventions(ModelConfigurationBuilder builder)
    {

        builder.Properties<DateOnly>()
            .HaveConversion<DateOnlyConverter>()
            .HaveColumnType("CreateAt");

        base.ConfigureConventions(builder);

    }*/

 /*   public DbSet<User> Users { get; set; }
    public DbSet<Outcome> Outcomes { get; set; }
    public DbSet<Income> Incomes { get; set; }*/
    public DbSet<Transaction> Transactions { get; set; }
  /*  public DbSet<Category> Categories { get; set; }*/
}
