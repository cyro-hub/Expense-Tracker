namespace Expense_Tracker.Core.Configuration;
public interface IUnitOfWork
{
    IncomeRepository Incomes { get; }
    OutcomeRepository Outcomes { get; }
    UserRepository Users { get; }
    CategoryRepository Categories { get; }

    void Complete();
    void Dispose();
}