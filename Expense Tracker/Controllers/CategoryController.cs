using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Expense_Tracker.Controllers;
[ApiController]
[Authorize]
public class CategoryController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public CategoryController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }


    [HttpGet("api/category")]
    public async Task<ActionResult> Get(Guid UserId)
    {

        var result = await _unitOfWork.Categories.GetCategories(new GetRequest()
        {
            UserId = UserId
        });

        return Ok(result);

        return BadRequest();
    }

    [HttpGet("api/category/{Id}")]
    public async Task<ActionResult> GetById(Guid Id,Guid UserId)
    {
        if (Id != Guid.Empty)
        {
            var result = await _unitOfWork.Categories.GetCategoryById(Id,UserId);

            return Ok(result);
        }
        return BadRequest(string.Empty);
    }

    [HttpPost("api/category")]
    public async Task<ActionResult> Post([FromBody] CategoryDTO request)
    {
        if (ModelState.IsValid)
        {
            var result = await _unitOfWork.Categories.AddCategory(request);

            _unitOfWork.Complete();

            _unitOfWork.Dispose();

            return Ok(result);
        }
        return BadRequest(string.Empty);
    }

    [HttpPut("api/category")]
    public async Task<ActionResult> Put([FromBody] CategoryRequestDTO request)
    {
        if (ModelState.IsValid)
        {
            var result = await _unitOfWork.Categories.UpdateCategory(request);

            _unitOfWork.Complete();

            return Ok(result);
        }
        return BadRequest("");
    }
}
