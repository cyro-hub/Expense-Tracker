/*using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Expense_Tracker.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class OutcomesController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public OutcomesController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult> Get(int CurrentPage, Guid UserId, string QueryString)
    {
        if (CurrentPage != null || CurrentPage >= 0)
        {
            var result = await _unitOfWork.Outcomes.GetIncome(new GetRequest()
            {
                CurrentPage = CurrentPage, UserId = UserId, QueryString = QueryString
            });

            return Ok(result);
        }
        return BadRequest();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> Get(Guid id)
    {
        if (id != Guid.Empty)
        {
            var outcome = await _unitOfWork.Outcomes.GetById(id);
            return Ok(outcome);
        }
        return BadRequest(string.Empty);
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody] OutcomeDTO request)
    {
        if (ModelState.IsValid)
        {
            var result = await _unitOfWork.Outcomes.Add(request);

            _unitOfWork.Complete();

            _unitOfWork.Dispose();
            return Ok(result);
        }
        return BadRequest(string.Empty);
    }

    [HttpPut]
    public async Task<ActionResult> Put([FromBody] OutcomeRequestDTO request)
    {
        if (ModelState.IsValid)
        {
            var result = await _unitOfWork.Outcomes.Update(request);

            _unitOfWork.Complete();

            _unitOfWork.Dispose();

            return Ok(result);
        }
        return BadRequest(string.Empty);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        if (id != Guid.Empty)
        {
            var result = await _unitOfWork.Outcomes.Remove(id);

            _unitOfWork.Complete();
            _unitOfWork.Dispose();

            return Ok(result);
        }
        return BadRequest(string.Empty);
    }
}
*/