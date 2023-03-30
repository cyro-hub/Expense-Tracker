using Expense_Tracker.Core.TransactionRepo;

namespace Expense_Tracker.Core.Configuration;

public class UnitOfWork : IDisposable, IUnitOfWork
{
    private readonly TrackerDbContext _context;
    public UserRepository Users { get; private set; }
    public CategoryRepository Categories { get; private set; }
    public AdminRepository Admin { get; private set; }
    public TransactionRepository Transactions { get; private set; }

    public UnitOfWork(TrackerDbContext context, ILoggerFactory loggerFactory, IConfiguration configuration,IMapper mapper)
    {
        _context = context;
        Users = (new UserRepository(context, loggerFactory.CreateLogger("logs"), configuration, mapper));
        Categories = (new CategoryRepository(context, loggerFactory.CreateLogger("logs"), mapper));
        Admin = (new AdminRepository(loggerFactory.CreateLogger("logs"), configuration));
        Transactions = (new TransactionRepository(context, loggerFactory.CreateLogger("logs"), mapper));
    }
    public void Complete()
    {
        _context.SaveChanges();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}
