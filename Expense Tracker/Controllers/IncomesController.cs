
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;

namespace Expense_Tracker.Controllers;

[Route("api/[controller]")]
[ApiController]
/*[Authorize]*/
public class IncomesController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly TrackerDbContext context;

    public IncomesController(IUnitOfWork unitOfWork,TrackerDbContext context)
    {
        _unitOfWork = unitOfWork;
        this.context = context;
    }
   
    [HttpGet("All")]
    public async Task<ActionResult> GetAllRecordsWithQuery(int CurrentPage,Guid UserId, string QueryString)
    {
        if (CurrentPage != null || CurrentPage >= 0)
        {
            var result = await _unitOfWork.Incomes.GetAll(new GetRequest()
            {
                CurrentPage = CurrentPage,
                UserId = UserId,
                QueryString = QueryString
            });

            return Ok(result);
        }
        return BadRequest();
    }

    [HttpGet]
    public async Task<ActionResult> GetIncomePerMonth(Guid UserId,DateOnly from,DateOnly to)
    {
        if (UserId != null)
        {
            var result = await _unitOfWork.Incomes.GetIncomePerMOnth(UserId, from, to);

            return Ok(result); 
        }
        return BadRequest();
    }


    [HttpGet("{id}")]
    public async Task<ActionResult> Get(Guid id)
    {
        if(id != Guid.Empty)
        {
            var income = await _unitOfWork.Incomes.GetById(id);
            return Ok(income);
        }
        return BadRequest(string.Empty);
    }

    // POST api/<IncomesController>
    [HttpPost]
    public async Task<ActionResult> Post([FromBody] IncomeDTO request)
    {
        if (ModelState.IsValid)
        {
            var result = await _unitOfWork.Incomes.Add(request);

            _unitOfWork.Complete();

            _unitOfWork.Dispose();
            return Ok(result);
        }
        return BadRequest(request);
    }

    // PUT api/<IncomesController>/5
    [HttpPut]
    public async Task<ActionResult> Put([FromBody] IncomeRequestDTO request)
    {
        if (ModelState.IsValid)
        {
            var result = await _unitOfWork.Incomes.Update(request);

            _unitOfWork.Complete();

            _unitOfWork.Dispose();
            
            return Ok(result);
        }
        return BadRequest("inappropriate object");
    }

    // DELETE api/<IncomesController>/5
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        if(id != Guid.Empty)
        {
            var result = await _unitOfWork.Incomes.Remove(id);

            _unitOfWork.Complete();

            _unitOfWork.Dispose();

            return Ok(result);
        }
        return BadRequest(string.Empty);
    }
}
