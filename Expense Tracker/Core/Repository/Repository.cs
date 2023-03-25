using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Expense_Tracker.Core.Repository;

public class Repository<T> where T : class
{
    protected TrackerDbContext context;
    protected ILogger logger;

    public Repository(TrackerDbContext context, ILogger logger)
    {
        this.context = context;
        this.logger = logger;
    }

    public virtual async Task<Responses<List<T>>> GetIncome(GetRequest request)
    {
        try
        {
            var pageSize = 10f;

            if (request.CurrentPage <= 0) request.CurrentPage = 1;

            var NumberOfPages = Math.Ceiling(context.Set<T>().Count() / pageSize);

            var result = await context.Set<T>().Skip((request.CurrentPage - 1) * (int)pageSize)
                                        .Take((int)pageSize)
                                        .ToListAsync();
            return (new Responses<List<T>>
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
            logger.LogError(ex, "{Repo} GetAllWithQuery no filters method error", typeof(Repository<T>));
            return new Responses<List<T>>() 
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation",
            };
        }
    }
    public async Task<Responses<T>> GetById(Guid Id)
    {
        try
        {
            var entity = await context.Set<T>().FindAsync(Id);

            return new Responses<T>
            {
                Data = entity,
                StatusCode = 200,
                IsSuccess = true,
                StatusMessage = "Successful Operation",
            };
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message, "{Repo} get entity by id method error", typeof(Repository<T>));
            return new Responses<T>
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation",
            };
        }
    }
    public async Task<Responses<T>> AddRange(List<T> request)
    {
        try
        {
            await context.Set<T>().AddRangeAsync(request);

            return (new Responses<T>
            {
                StatusCode = 200,
                StatusMessage = "successful Operation",
                IsSuccess = true
            });
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message, "{Repo} Add Entity method error", typeof(Repository<T>));
            return new Responses<T>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }
    public virtual async Task<Responses<T>> Remove(Guid id)
    {
        try
        {
            var entity = await context.Set<T>().FindAsync(id);

            context.Set<T>().Remove(entity);

            return (new Responses<T>
            {
                StatusCode = 200,
                StatusMessage = "successful Operation",
                IsSuccess = true
            });
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message, "{Repo} remove method error", typeof(Repository<T>));
            return new Responses<T>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }

}
