using System.Collections.Generic;

namespace Expense_Tracker.Core.OptionsRepo;

public class CategoryRepository : Repository<Category>
{
    private readonly TrackerDbContext _context;
    private readonly ILogger _logger;
    private readonly IMapper _mapper;

    public CategoryRepository(TrackerDbContext context, ILogger logger,IMapper mapper)
        : base(context, logger)
    {
        _context = context;
        _logger = logger;
        _mapper = mapper;
    }

    /*public override async Task<Responses<List<Category>>> GetIncome(GetRequest request)
    {
        try
        {
            var result = await _context.Categories.Where(option => request.UserId == option.UserId).ToListAsync();

                return (new Responses<List<Category>>
                {
                    StatusCode = 200,
                    StatusMessage = "successful Operation",
                    Data = result,
                    IsSuccess = true
                });
          
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting Option records", typeof(Repository<Category>));

            return new Responses<List<Category>>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }
    public async Task<Responses<Category>> Add(CategoryDTO request)
    {

        try
        {
            Category category = await _context.Categories.Where(category => category.UserId == request.UserId && category.Name.ToLower().Equals(request.Name.ToLower())).FirstOrDefaultAsync();

            if (category is not null)
            {
                return (new Responses<Category>()
                {
                    StatusCode = 203,
                    StatusMessage = "Category already exist",
                    IsSuccess = false
                });
            }

            category = _mapper.Map<Category>(request);

            category.Id = Guid.NewGuid();

            await _context.Set<Category>().AddAsync(category);

            return (new Responses<Category>()
            {
                StatusCode = 200,
                StatusMessage = "successfully added the new category",
                IsSuccess = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "{Repo} GetAll method error", typeof(Repository<Category>));
            return new Responses<Category>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }

    }
    public async Task<Responses<Category>> Update(CategoryRequestDTO request)
    {
        try
        {
            var result = await _context.Categories.Where(opt => opt.Id == request.Id && opt.UserId == request.UserId).FirstOrDefaultAsync();

            result.Name = request.Name;

            await _context.SaveChangesAsync();

            result = await _context.Categories.Where(opt => opt.Id == request.Id && opt.UserId == request.UserId).FirstOrDefaultAsync();

            return (new Responses<Category>
            {
                StatusCode = 200,
                StatusMessage = "successful Operation",
                Data = result,
                IsSuccess = true
            });

        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting Option records", typeof(Repository<Category>));

            return new Responses<Category>()
            {
                StatusCode = 500,
                IsSuccess = false,
                StatusMessage = "Failed Operation"
            };
        }
    }*/
}
