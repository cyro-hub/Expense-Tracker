using Expense_Tracker.Models.OutcomeModel;
using Google.Protobuf.WellKnownTypes;

namespace Expense_Tracker.Core.TransactionRepo;

public class TransactionRepository : Repository<Transaction>
{
    private readonly TrackerDbContext _context;
    private readonly ILogger _logger;
    private readonly IMapper _mapper;

    public TransactionRepository(TrackerDbContext context, ILogger logger, IMapper mapper)
        : base(context, logger)
    {
        _context = context;
        _logger = logger;
        _mapper = mapper;
    }

    public async Task<Responses<Transaction>> AddIncome(TransactionDTO request)
    {
        try
        {
            Transaction income = _mapper.Map<Transaction>(request);
            income.Id = Guid.NewGuid();
            income.FullMonth = request.CreatedAt.ToString("MMMM");
            income.Type = Types.In;

            if (income.Amount <= 0)
            {
                return (new Responses<Transaction>()
                {
                    StatusCode = 200,
                    StatusMessage = "Amount must be greater than zero",
                    IsSuccess = false
                });
            }


            /*var user = await _context.Users.Where(user => income.UserId == user.Id).FirstOrDefaultAsync();

            if (user is null)
            {
                return (new Responses<Transaction>()
                {
                    StatusCode = 404,
                    StatusMessage = "Not Authorised",
                    IsSuccess = false
                });
            }*/

            await _context.Set<Transaction>().AddAsync(income);
/*
            user.Balance += income.Amount;*/

            return (new Responses<Transaction>()
            {
                StatusCode = 200,
                StatusMessage = "successful Operation",
                IsSuccess = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "{Repo} Add outcome method error", typeof(Repository<Outcome>));

            return new Responses<Transaction>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }
    public async Task<Responses<Transaction>> AddOutcome(TransactionDTO request)
    {
        try
        {
            Transaction outcome = _mapper.Map<Transaction>(request);
            outcome.Id = Guid.NewGuid();
            outcome.FullMonth = request.CreatedAt.ToString("MMMM");
            outcome.Type = Types.Out;

            if (outcome.Amount <= 0)
            {
                return (new Responses<Transaction>()
                {
                    StatusCode = 200,
                    StatusMessage = "Amount must be greater than zero",
                    IsSuccess = false
                });
            }

            /*var user = await _context.Users.Where(user => outcome.UserId == user.Id).FirstOrDefaultAsync();

            if (user is null)
            {
                return (new Responses<Transaction>()
                {
                    StatusCode = 404,
                    StatusMessage = "Not Authorised",
                    IsSuccess = false
                });
            }

            var checker = user.Balance - outcome.Amount;

            if (checker < 0)
            {
                return (new Responses<Transaction>()
                {
                    StatusCode = 200,
                    StatusMessage = "Balance is insufficient " + user.Balance,
                    IsSuccess = false
                });
            }*/

            await _context.Set<Transaction>().AddAsync(outcome);

          /*  user.Balance -= outcome.Amount;*/

            return (new Responses<Transaction>()
            {
                StatusCode = 200,
                StatusMessage = "successful Operation",
                IsSuccess = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "{Repo} Add outcome method error", typeof(Repository<Outcome>));

            return new Responses<Transaction>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }
    public async Task<Responses<List<Transaction>>> GetOutcome(GetRequest request)
    {
        try
        {
            var pageSize = 10f;

            if (request.CurrentPage <= 0) request.CurrentPage = 1;

            var NumberOfPages = Math.Ceiling(context.Set<Transaction>().Count() / pageSize);

            var Result = await context.Set<Transaction>().Where(income => request.User == income.User &&
                                                                          income.Type.Equals("In"))
                                        .Skip((request.CurrentPage - 1) * (int)pageSize)
                                        .Take((int)pageSize)
                                        .Include("Category")
                                        .ToListAsync();

            return (new Responses<List<Transaction>>
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

            return new Responses<List<Transaction>>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }
    public async Task<Responses<List<Transaction>>> GetIncome(GetRequest request)
    {
        try
        {
            var pageSize = 10f;

            if (request.CurrentPage <= 0) request.CurrentPage = 1;

            var NumberOfPages = Math.Ceiling(context.Set<Transaction>().Count() / pageSize);

            var Result = await context.Set<Transaction>().Where(income => request.User == income.User &&
                                                                          income.Type.Equals("Out"))
                                        .Skip((request.CurrentPage - 1) * (int)pageSize)
                                        .Take((int)pageSize)
                                        .Include("Category")
                                        .ToListAsync();

            return (new Responses<List<Transaction>>
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

            return new Responses<List<Transaction>>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }
}
