using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Expense_Tracker.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class CategoryController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public CategoryController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

   
    [HttpGet]
    public async Task<ActionResult> GetAll(Guid UserId)
    {
        
        var result = await _unitOfWork.Categories.GetAll(new GetRequest()
        {
            UserId = UserId
        });

        return Ok(result);
        
        return BadRequest();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> Get(Guid id)
    {
        if (id != Guid.Empty)
        {
            var result = await _unitOfWork.Categories.GetById(id);

            return Ok(result);
        }
        return BadRequest(string.Empty);
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody] CategoryDTO request)
    {
        if (ModelState.IsValid)
        {
            var result = await _unitOfWork.Categories.Add(request);

            _unitOfWork.Complete();

            _unitOfWork.Dispose();

            return Ok(result);
        }
        return BadRequest(string.Empty);
    }

    [HttpPut]
    public async Task<ActionResult> Put([FromBody] CategoryRequestDTO request)
    {
        if (ModelState.IsValid)
        {
            var result = await _unitOfWork.Categories.Update(request);

            _unitOfWork.Complete();

            return Ok(result);
        }
        return BadRequest("");
    }
}
