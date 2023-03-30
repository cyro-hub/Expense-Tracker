using System.ComponentModel;

namespace Expense_Tracker.Core;

public class TrackerDbContext:DbContext
{
    public TrackerDbContext(DbContextOptions<TrackerDbContext> options):base (options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(TrackerDbContext).Assembly);
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Category> Categories { get; set; }
}
