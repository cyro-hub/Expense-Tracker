using Expense_Tracker.Models.UserModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Expense_Tracker.Controllers;
[ApiController]
[Authorize]
public class TransactionsController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    public TransactionsController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("api/income")]
    public async Task<ActionResult> GetIncome(int CurrentPage, Guid UserId, string QueryString)
    {
        var result = await _unitOfWork.Transactions.GetTransactions(new GetRequest()
                                        {
                                            CurrentPage = CurrentPage,
                                            UserId = UserId,
                                            QueryString = QueryString
                                        }, "in");

        return Ok(result);
    }
    [HttpGet("api/outcome")]
    public async Task<ActionResult> GetOutcome(int CurrentPage, Guid UserId, string QueryString)
    {
        var result = await _unitOfWork.Transactions.GetTransactions(new GetRequest()
        {
            CurrentPage = CurrentPage,
            UserId = UserId,
            QueryString = QueryString
        }, "out");

        return Ok(result);
    }
    [HttpPost("api/income")]
    public async Task<ActionResult> PostIncome([FromBody] TransactionDTO request)
    {
        var result = await _unitOfWork.Transactions.AddTransaction(request,"In");

        _unitOfWork.Complete();
        _unitOfWork.Dispose();

        return Ok(result);
    }
    [HttpPost("api/outcome")]
    public async Task<ActionResult> Post([FromBody] TransactionDTO request)
    {
        var result = await _unitOfWork.Transactions.AddTransaction(request,"Out");

        _unitOfWork.Complete();
        _unitOfWork.Dispose();

        return Ok(result);
    }
    [HttpPut("api/income")]
    public async Task<ActionResult> PutIncome([FromBody] TransactionDTO request)
    {
        var result = await _unitOfWork.Transactions.UpdateIncome(request);

        return Ok(result);
    }
    [HttpPut("api/outcome")]
    public async Task<ActionResult> PutOutcome([FromBody] TransactionDTO request)
    {
        var result = await _unitOfWork.Transactions.UpdateOutcome(request);

        return Ok(result);
    }
    [HttpDelete("api/income")]
    public async Task<ActionResult> DeleteIncome(Guid id)
    {
        if (id != Guid.Empty)
        {
            var result = await _unitOfWork.Transactions.Remove(id,"in");

            _unitOfWork.Complete();

            _unitOfWork.Dispose();

            return Ok(result);
        }
        return BadRequest(string.Empty);
    }
    [HttpDelete("api/outcome")]
    public async Task<ActionResult> DeleteOutcome(Guid id)
    {
        if (id != Guid.Empty)
        {
            var result = await _unitOfWork.Transactions.Remove(id, "out");

            _unitOfWork.Complete();

            _unitOfWork.Dispose();

            return Ok(result);
        }
        return BadRequest(string.Empty);
    }
}
