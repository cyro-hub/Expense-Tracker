using Expense_Tracker.Models.IncomeModel;

namespace Expense_Tracker.Core.OutcomeRepo;

public class OutcomeRepository : Repository<Outcome>
{
    private readonly TrackerDbContext _context;
    private readonly ILogger _logger;
    private readonly IMapper _mapper;

    public OutcomeRepository(TrackerDbContext context, ILogger logger,IMapper mapper)
        : base(context, logger)
    {
        _context = context;
        _logger = logger;
        _mapper = mapper;
    }

    public async Task<Responses<List<TransactionResponse>>> GetOutcomePerMOnth(Guid UserId)
    {
        try
        {
            var result = await _context.Incomes.FromSql($"SELECT CategoryId, UserId, Currency, Id, Amount, monthname(CreatedAt) as Month, CreatedAt FROM outcomes where UserId={UserId}").Select(income => new TransactionResponse() { Amount = income.Amount, FullMonth = income.FullMonth }).ToListAsync();


            return (new Responses<List<TransactionResponse>>
            {
                StatusCode = 200,
                StatusMessage = "successful Operation",
                Data = result,
                IsSuccess = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting the lastest income record", typeof(Repository<Outcome>));

            return new Responses<List<TransactionResponse>>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed to get outcome per month"
            };
        }
    }
    public override async Task<Responses<List<Outcome>>> GetAll(GetRequest request)
    {
        try
        {
            var pageSize = 10f;

            
                if (request.CurrentPage <= 0) request.CurrentPage = 1;

                var NumberOfPages = Math.Ceiling(_context.Outcomes.Count() / pageSize);

                var result = await _context.Outcomes.Where(outcome => outcome.UserId == request.UserId)
                                            .Skip((request.CurrentPage - 1) * (int)pageSize)
                                            .Take((int)pageSize)
                                            .Include("Category")
                                            .ToListAsync();
                return (new Responses<List<Outcome>>()
                {
                    CurrentPage = request.CurrentPage,
                    StatusCode = 200,
                    StatusMessage = "successful Operation",
                    Data = result,
                    NumberOfPages = (int)NumberOfPages,
                    IsSuccess = true
                });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting income records", typeof(Repository<Income>));

            return new Responses<List<Outcome>>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }
    public async Task<Responses<Outcome>> Add(OutcomeDTO request)
    {
        try
        {
            Outcome outcome = _mapper.Map<Outcome>(request);
            outcome.Id = Guid.NewGuid();

            if (outcome.Amount <= 0)
            {
                return (new Responses<Outcome>()
                {
                    StatusCode = 200,
                    StatusMessage = "Amount must be greater than zero",
                    IsSuccess = false
                });
            }


            var user = await _context.Users.Where(user => outcome.UserId == user.Id).FirstOrDefaultAsync();

            if (user is null)
            {
                return (new Responses<Outcome>()
                {
                    StatusCode = 404,
                    StatusMessage = "Not Authorised",
                    IsSuccess = false
                });
            }

            var checker = user.Balance - outcome.Amount;

            if (checker < 0)
            {
                return (new Responses<Outcome>()
                {
                    StatusCode = 200,
                    StatusMessage = "Balance is insufficient " + user.Balance,
                    IsSuccess = false
                });
            }

            await _context.Outcomes.AddAsync(outcome);

            user.Balance -= outcome.Amount;

            return (new Responses<Outcome>()
            {
                StatusCode = 200,
                StatusMessage = "successful Operation",
                IsSuccess = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "{Repo} Add outcome method error", typeof(Repository<Outcome>));

            return new Responses<Outcome>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }
    public override async Task<Responses<Outcome>> Remove(Guid Id)
    {
        try
        {
            var outcome = await _context.Outcomes.FindAsync(Id);

            if(outcome is null)
            {
                return (new Responses<Outcome>
                {
                    StatusCode = 200,
                    StatusMessage = "Record not found",
                    IsSuccess = false
                });
            }

            var user = await _context.Users.FindAsync(outcome.UserId);

            user.Balance += outcome.Amount;

            _context.Outcomes.Remove(outcome);

            return (new Responses<Outcome>
            {
                StatusCode = 200,
                StatusMessage = "successful Operation",
                IsSuccess = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message, "{Repo} remove method error", typeof(Repository<Outcome>));
            return new Responses<Outcome>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }
    public async Task<Responses<Outcome>> Update(OutcomeRequestDTO request)
    {
        try
        {

            var outcome = await _context.Outcomes.Where(outcome => outcome.Id == request.Id).FirstOrDefaultAsync();

            var UserInfo = _context.Users.Where(user => user.Id == request.UserId).FirstOrDefault();

            UserInfo.Balance += outcome.Amount;

            UserInfo.Balance -= request.Amount;

            outcome.Amount = request.Amount;
            outcome.CreatedAt = request.CreatedAt;
            outcome.CategoryId = request.CategoryId;
            outcome.Currency = request.Currency;

            await _context.SaveChangesAsync();

            outcome = await _context.Outcomes.Where(outcome => outcome.Id == request.Id).FirstOrDefaultAsync();

            return (new Responses<Outcome>()
            {
                Data = outcome ,
                StatusCode = 200,
                StatusMessage = "successful Operation",
                IsSuccess = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating the outcome record", typeof(Repository<Outcome>));

            return new Responses<Outcome>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }
}
