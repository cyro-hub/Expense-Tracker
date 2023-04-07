using Google.Protobuf.WellKnownTypes;
using MySqlX.XDevAPI.Common;

namespace Expense_Tracker.Core.TransactionRepo;

public class TransactionRepository
{
    private readonly TrackerDbContext _context;
    private readonly ILogger _logger;
    private readonly IMapper _mapper;

    public TransactionRepository(TrackerDbContext context, ILogger logger, IMapper mapper)
    {
        _context = context;
        _logger = logger;
        _mapper = mapper;
    }
    public async Task<Responses<Transaction>> AddTransaction(TransactionDTO request, string Type)
    {
        try
        {
            Transaction transaction = _mapper.Map<Transaction>(request);
            transaction.Id = Guid.NewGuid();
            transaction.FullMonth = request.CreatedAt.ToString("MMMM");

            if (transaction.Amount <= 0)
            {
                return (new Responses<Transaction>()
                {
                    StatusCode = 200,
                    StatusMessage = "Amount must be greater than zero",
                    IsSuccess = false
                });
            }

            var user = await _context.Users.Where(user => transaction.UserId == user.Id).FirstOrDefaultAsync();

            if (user is null)
            {
                return (new Responses<Transaction>()
                {
                    StatusCode = 404,
                    StatusMessage = "Not Authorised",
                    IsSuccess = false
                });
            }

            if (Type == "In")
            {
                transaction.Type = Types.In;

                user.Balance += transaction.Amount;

            }
            else if(Type == "Out")
            {
                transaction.Type = Types.Out;

                var checker = user.Balance - transaction.Amount;

                if (checker < 0)
                {
                    return (new Responses<Transaction>()
                    {
                        StatusCode = 200,
                        StatusMessage = "Balance is insufficient " + user.Balance,
                        IsSuccess = false
                    });
                }

                await _context.Set<Transaction>().AddAsync(transaction);

                user.Balance -= transaction.Amount;
            }

            await _context.Set<Transaction>().AddAsync(transaction);

            return (new Responses<Transaction>()
            {
                StatusCode = 200,
                StatusMessage = "successful Operation",
                IsSuccess = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message, "{Repo} Add Transaction method error", typeof(TransactionRepository));

            return new Responses<Transaction>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }
    public async Task<Responses<List<Transaction>>> GetTransactions(GetRequest request,string type)
    {
        try
        {
            var pageSize = 10f;

            if (request.CurrentPage <= 0) request.CurrentPage = 1;

            if (type == "in")
            {
                var Type = Types.In;

                var NumberOfPages = Math.Ceiling(_context.Set<Transaction>().Include("Category")
                                                     .Where(income => request.UserId == income.UserId &&
                                                                      income.Type.Equals(Type) && 
                                                                      (string.IsNullOrEmpty(request.QueryString) ||
                                                                      income.Category.Name.Contains(request.QueryString)) ||
                                                                      income.FullMonth.Contains(request.QueryString))
                                                     .Count() / pageSize);

                var Result = await _context.Set<Transaction>()
                                            .Include("Category")
                                            .Where(income => request.UserId == income.UserId &&
                                                                      income.Type.Equals(Type) &&
                                                                      (string.IsNullOrEmpty(request.QueryString) ||
                                                                      income.Category.Name.Contains(request.QueryString)) ||
                                                                      income.FullMonth.Contains(request.QueryString))
                                            .Skip((request.CurrentPage - 1) * (int)pageSize)
                                            .Take((int)pageSize)
                                            .ToListAsync();
                return (new Responses<List<Transaction>>
                {
                    CurrentPage = request.CurrentPage,
                    StatusCode = 200,
                    StatusMessage = request.QueryString,
                    Data = Result,
                    NumberOfPages = (int)NumberOfPages,
                    IsSuccess = true
                });
            }
            else if (type == "out")
            {
                var Type = Types.Out;

                var NumberOfPages = Math.Ceiling(_context.Set<Transaction>()
                                                     .Include("Category")
                                                     .Where(income => request.UserId == income.UserId &&
                                                                      income.Type.Equals(Type) &&
                                                                      (string.IsNullOrEmpty(request.QueryString) ||
                                                                      income.Category.Name.Contains(request.QueryString)) ||
                                                                      income.FullMonth.Contains(request.QueryString))
                                                     .Count() / pageSize);

                var Result = await _context.Set<Transaction>()
                                            .Include("Category")
                                            .Where(income => request.UserId == income.UserId &&
                                                                      income.Type.Equals(Type) &&
                                                                      (string.IsNullOrEmpty(request.QueryString) ||
                                                                      income.Category.Name.Contains(request.QueryString)) ||
                                                                      income.FullMonth.Contains(request.QueryString))
                                            .Skip((request.CurrentPage - 1) * (int)pageSize)
                                            .Take((int)pageSize)
                                            .ToListAsync();
                return (new Responses<List<Transaction>>
                {
                    CurrentPage = request.CurrentPage,
                    StatusCode = 200,
                    StatusMessage = request.QueryString,
                    Data = Result,
                    NumberOfPages = (int)NumberOfPages,
                    IsSuccess = true
                });
            }

            return (new Responses<List<Transaction>>
            {
                CurrentPage = request.CurrentPage,
                StatusCode = 200,
                StatusMessage = "successful Operation",
                IsSuccess = false
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error getting records", typeof(TransactionRepository));

            return new Responses<List<Transaction>>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }
    public async Task<Responses<Transaction>> UpdateIncome(TransactionDTO request)
    {
        try
        {

            var transaction = await _context.Set<Transaction>()
                                       .Where(transaction => transaction.Id == request.Id)
                                       .FirstOrDefaultAsync();

            if (transaction is null)
            {
                return (new Responses<Transaction>()
                {
                    StatusCode = 203,
                    StatusMessage = "Cannot perform operations make sure you have a record in the database",
                    IsSuccess = false
                });
            }

            var user = await _context.Users.Where(user => user.Id == request.UserId).FirstOrDefaultAsync();

            if (user is null)
            {
                return (new Responses<Transaction>()
                {
                    StatusCode = 404,
                    StatusMessage = "Not Authorised",
                    IsSuccess = false
                });
            }

            var checker = user.Balance - transaction.Amount;

            if (checker < 0)
            {
                return (new Responses<Transaction>()
                {
                    Data = transaction,
                    StatusCode = 200,
                    StatusMessage = "Unable to update amount because the balance is not sufficient",
                    IsSuccess = true
                });
            }

            user.Balance = (user.Balance - transaction.Amount + request.Amount);

            transaction.Amount = request.Amount;
            transaction.CreatedAt = request.CreatedAt;
            transaction.CategoryId = request.CategoryId;
            transaction.Currency = request.Currency;
            transaction.FullMonth = request.CreatedAt.ToString("MMMM");

            await _context.SaveChangesAsync();

            transaction = await _context.Set<Transaction>().Where(income => income.Id == request.Id).FirstOrDefaultAsync();

            return (new Responses<Transaction>()
            {
                Data = transaction,
                StatusCode = 200,
                StatusMessage = "successful Operation",
                IsSuccess = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating the income record", typeof(TransactionRepository));

            return new Responses<Transaction>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }
    public async Task<Responses<Transaction>> UpdateOutcome(TransactionDTO request)
    {
        try
        {

            var transaction = await _context.Set<Transaction>().Where(outcome => outcome.Id == request.Id).FirstOrDefaultAsync();

            var user = _context.Users.Where(user => user.Id == request.UserId).FirstOrDefault();

            user.Balance += transaction.Amount;

            decimal balance = user.Balance + transaction.Amount;

            if(balance - request.Amount < 0)
            {
                return (new Responses<Transaction>()
                {
                    StatusCode = 203,
                    StatusMessage = "Insufficient Balance",
                    IsSuccess = true
                });
            }

            user.Balance -= request.Amount;

            transaction.Amount = request.Amount;
            transaction.CreatedAt = request.CreatedAt;
            transaction.CategoryId = request.CategoryId;
            transaction.Currency = request.Currency;
            transaction.FullMonth = request.CreatedAt.ToString("MMMM");

            await _context.SaveChangesAsync();

            transaction = await _context.Set<Transaction>().Where(outcome => outcome.Id == request.Id).FirstOrDefaultAsync();

            return (new Responses<Transaction>()
            {
                Data = transaction,
                StatusCode = 200,
                StatusMessage = "successful Operation",
                IsSuccess = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating the outcome record", typeof(TransactionRepository));

            return new Responses<Transaction>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }
    public async Task<Responses<Transaction>> Remove(Guid Id, string type)
    {
        try
        {
            var transaction = await _context.Set<Transaction>().FindAsync(Id);

            if (transaction is null)
            {
                return (new Responses<Transaction>()
                {
                    StatusCode = 203,
                    StatusMessage = "Cannot perform operations make sure you have a record in the database",
                    IsSuccess = false
                });
            }

            var user = await _context.Users.FindAsync(transaction.UserId);

            if (user is null)
            {
                return (new Responses<Transaction>()
                {
                    StatusCode = 404,
                    StatusMessage = "Not Authorised",
                    IsSuccess = false
                });
            }
            if (type == "in")
            {
                var checker = user.Balance - transaction.Amount;

                if (checker < 0)
                {
                    return (new Responses<Transaction>
                    {
                        StatusCode = 200,
                        StatusMessage = "Could not delete income record",
                        IsSuccess = false
                    });
                }

                user.Balance -= transaction.Amount;

                _context.Set<Transaction>().Remove(transaction);

                return (new Responses<Transaction>
                {
                    StatusCode = 200,
                    StatusMessage = "successful Operation",
                    IsSuccess = true
                });
            }
            if (type == "out")
            {
                user.Balance += transaction.Amount;

                _context.Set<Transaction>().Remove(transaction);

                return (new Responses<Transaction>
                {
                    StatusCode = 200,
                    StatusMessage = "successful Operation",
                    IsSuccess = true
                });
            }

            return (new Responses<Transaction>
            {
                StatusCode = 203,
                StatusMessage = "failed operation",
                IsSuccess = false
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message, "{Repo} remove method error", typeof(TransactionRepository));
            return new Responses<Transaction>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }
}
