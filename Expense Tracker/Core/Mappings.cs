

namespace Expense_Tracker.Core;

public class Mappings:Profile
{
    public Mappings()
    {
        CreateMap<User,UserResponseDTO>();
        CreateMap<UserRequestDTO,User>();
        /*CreateMap<Income, IncomeDTO>();
        CreateMap<IncomeDTO, Income>();
        CreateMap<Outcome, OutcomeDTO>();
        CreateMap<OutcomeDTO, Outcome>();*/
        CreateMap<Category, CategoryDTO>();
        CreateMap<CategoryDTO, Category>();
        CreateMap<Transaction, TransactionDTO>();
        CreateMap<TransactionDTO, Transaction>();
    }
}
