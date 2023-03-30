using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
namespace Expense_Tracker.Controllers;
[Route("api/[controller]")]
[Authorize]
[ApiController]
public class AdminController : Controller
{
    private readonly IUnitOfWork _unitOfWork;

    public AdminController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("/api/report")]
    public async Task<ActionResult> Get(Guid Id, string from, string to)
    {
        var result = await _unitOfWork.Admin.TransactionReport(Id, from, to);

        return Ok(result);
    }

    [HttpGet("/api/analysis")]
    public async Task<ActionResult> Analysis(Guid Id, string from, string to)
    {
        var result = await _unitOfWork.Admin.TransactionAnalysis(Id, from, to);

        return Ok(result);
    }

}
