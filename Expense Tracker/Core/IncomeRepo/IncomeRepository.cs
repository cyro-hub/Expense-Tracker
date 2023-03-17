using Expense_Tracker.Models.UserModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using System.Linq;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Expense_Tracker.Core.IncomeRepo;

public class IncomeRepository : Repository<Income>
{
    private readonly TrackerDbContext _context;
    private readonly ILogger _logger;
    private readonly IMapper _mapper;

    public IncomeRepository(TrackerDbContext context, ILogger logger,IMapper mapper)
        : base(context, logger)
    {
        _context = context;
        _logger = logger;
        _mapper = mapper;
    }

    public async Task<Responses<List<TransactionResponse>>> GetIncomePerMOnth(Guid UserId,DateOnly from,DateOnly to)
    {
        try
        {
            /*var result = await _context.Incomes.FromSql($@"SELECT FullMonth, 
                                                                  CreatedAt, 
                                                                  SUM(Amount) AS Amount 
                                                           FROM incomes 
                                                           WHERE UserId={UserId} AND 
                                                                 CreatedAt>={from} AND 
                                                                 CreatedAt<={to} 
                                                           GROUP BY FullMonth, 
                                                                    CreatedAt,
                                                           ").
                                                           Select(income => new TransactionResponse()
                                                           {
                                                               Amount = income.Amount,
                                                               FullMonth = income.FullMonth
                                                           }).
                                                           ToListAsync();*/

            /* var result = await _context.Incomes.Where(c => c.CreatedAt >= from &&
                                                       c.CreatedAt <= to &&
                                                       c.UserId == UserId)
                                                .GroupBy(c => c.CreatedAt)
                                                .Select(c => new {c.Key, c.Sum(z => z.Amount)})
                                                .TolistAsync();*/
    /*        var result = await _context.Database.ExecuteSqlRaw($"CALL new").ToListAsync();*/

            return (new Responses<List<TransactionResponse>>
            {
                StatusCode = 200,
                StatusMessage = "successful Operation",
               /* Data = result,*/
                IsSuccess = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting the lastest income record", typeof(Repository<Income>));

            return new Responses<List<TransactionResponse>>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Getting the income per month"
            };
        }
    }
    public override async Task<Responses<List<Income>>> GetAll(GetRequest request)
    {
        try
        {
            var pageSize = 10f;

            
                if (request.CurrentPage <= 0) request.CurrentPage = 1;

                var NumberOfPages = Math.Ceiling(context.Incomes.Count() / pageSize);

                var Result = await context.Incomes.Where(income => request.UserId == income.UserId)
                                            .Skip((request.CurrentPage - 1) * (int)pageSize)
                                            .Take((int)pageSize)
                                            .Include("Category")
                                            .ToListAsync();
                return (new Responses<List<Income>>
                {
                    CurrentPage = request.CurrentPage,
                    StatusCode = 200,
                    StatusMessage = "successful Operation",
                    Data = Result,
                    NumberOfPages = (int)NumberOfPages,
                    IsSuccess = true
                });
            
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting income records", typeof(Repository<Income>));

            return new Responses<List<Income>>()
            {
                Data = default(List<Income>),
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }
    public async Task<Responses<Income>> Update(IncomeRequestDTO request)
    {
        try
        {

            var income = await _context.Incomes.Where(income => income.Id == request.Id).FirstOrDefaultAsync();

            if (income is null)
            {
                return (new Responses<Income>()
                {
                    StatusCode = 203,
                    StatusMessage = "Cannot perform operations make sure you have a record in the database",
                    IsSuccess = false
                });
            }

            var user = await _context.Users.Where(user => user.Id == request.UserId).FirstOrDefaultAsync();

            if (user is null)
            {
                return (new Responses<Income>()
                {
                    StatusCode = 404,
                    StatusMessage = "Not Authorised",
                    IsSuccess = false
                });
            }

            var checker = user.Balance - income.Amount;

            if (checker < 0)
            {
                return (new Responses<Income>()
                {
                    Data = income ,
                    StatusCode = 200,
                    StatusMessage = "Unable to update amount because the balance is not sufficient",
                    IsSuccess = true
                });
            }

            user.Balance = (user.Balance - income.Amount + request.Amount);

            income.Amount = request.Amount;
            income.CreatedAt = request.CreatedAt;
            income.CategoryId = request.CategoryId;
            income.Currency = request.Currency;
            income.FullMonth = request.CreatedAt.Month.ToString();

            await _context.SaveChangesAsync();

            income = await _context.Incomes.Where(income => income.Id == request.Id).FirstOrDefaultAsync();

            return (new Responses<Income>()
            {
                Data = income,
                StatusCode = 200,
                StatusMessage = "successful Operation",
                IsSuccess = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating the income record", typeof(Repository<Income>));

            return new Responses<Income>()
            {
                Data = default(Income),
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }
    public async Task<Responses<Income>> Add(IncomeDTO request)
    {
        Income income = _mapper.Map<Income>(request);

        income.Id = Guid.NewGuid();
        income.FullMonth = request.CreatedAt.Month.ToString();

        try
        {
            if (income.Amount <= 0)
            {
                return (new Responses<Income>()
                {
                    StatusCode = 203,
                    StatusMessage = "Failed Operation Amount must be greater than zero",
                    IsSuccess = false
                });
            }

            var user = await _context.Users.Where(user => income.UserId == user.Id).FirstOrDefaultAsync();

            if(user is null)
            {
                return (new Responses<Income>()
                {
                    StatusCode = 404,
                    StatusMessage = "Not Authorised",
                    IsSuccess = false
                });
            }

            await _context.Incomes.AddAsync(income);

            user.Balance += income.Amount;

            return (new Responses<Income>()
            {
                StatusCode = 200,
                StatusMessage = "successful Operation",
                IsSuccess = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message, "{Repo} Add income method error", typeof(Repository<Income>));
            return new Responses<Income>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }
    public override async Task<Responses<Income>> Remove(Guid Id)
    {
        try
        {
            var income = await _context.Incomes.FindAsync(Id);

            if (income is null)
            {
                return (new Responses<Income>()
                {
                    StatusCode = 203,
                    StatusMessage = "Cannot perform operations make sure you have a record in the database",
                    IsSuccess = false
                });
            }

            var user = await _context.Users.FindAsync(income.UserId);

            if (user is null)
            {
                return (new Responses<Income>()
                {
                    StatusCode = 404,
                    StatusMessage = "Not Authorised",
                    IsSuccess = false
                });
            }

            var checker = user.Balance - income.Amount;

            if (checker < 0)
            {
                return (new Responses<Income>
                {
                    StatusCode = 200,
                    StatusMessage = "Could not delete income record",
                    IsSuccess = false
                });
            }

            user.Balance -= income.Amount;

            _context.Incomes.Remove(income);

            return (new Responses<Income>
            {
                StatusCode = 200,
                StatusMessage = "successful Operation",
                IsSuccess = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message, "{Repo} remove method error", typeof(Repository<Income>));
            return new Responses<Income>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }
}
