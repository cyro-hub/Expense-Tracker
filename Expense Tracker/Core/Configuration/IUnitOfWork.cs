using Expense_Tracker.Core.TransactionRepo;

namespace Expense_Tracker.Core.Configuration;
public interface IUnitOfWork
{
   /* IncomeRepository Incomes { get; }
    OutcomeRepository Outcomes { get; }
    UserRepository Users { get; }*/
    /*CategoryRepository Categories { get; }
    AdminRepository Admin { get; }*/
    TransactionRepository Transactions { get; }

    void Complete();
    void Dispose();
}