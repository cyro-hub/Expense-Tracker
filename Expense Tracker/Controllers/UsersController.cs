/*using Expense_Tracker.Core.Configuration;
using Expense_Tracker.Models;
using Expense_Tracker.Models.UserModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Expense_Tracker.Controllers;
[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public UsersController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    [HttpGet]
    [Authorize]
    public async Task<ActionResult> GetUserBalance(Guid UserId)
    {
        var result = await _unitOfWork.Users.GetBalance(UserId);

        return Ok(result);
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] UserRequestDTO request)
    {
        if(ModelState.IsValid)
        {
            RefreshToken  refreshToken = GenerateRefreshToken();    

            var result = await _unitOfWork.Users.Register(request, refreshToken);
            
            _unitOfWork.Complete();

            _unitOfWork.Dispose();

            SetRefreshToken(refreshToken);

            return Ok(result);
        }
        return BadRequest("Unauthorised user");
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] UserRequestDTO request)
    {
        if (ModelState.IsValid)
        {
            RefreshToken refreshToken = GenerateRefreshToken();
         
            var result = await _unitOfWork.Users.Login(request, refreshToken);

            _unitOfWork.Complete();

            _unitOfWork.Dispose();

            SetRefreshToken(refreshToken);

            return Ok(result);
        }
        return BadRequest("Unauthorised user");
    }

    [HttpGet("refresh-token")]
    public async Task<ActionResult> RefreshToken()
    {
        string refreshToken = Request.Cookies["refreshToken"];

        var result = await _unitOfWork.Users.CheckUserRefreshToken(refreshToken);

        return Ok(result);
    }
    [HttpPost]
    public async Task<ActionResult> Logout()
    {
        string refreshToken = Request.Cookies["refreshToken"];

        var result = _unitOfWork.Users.Logout(refreshToken);

        _unitOfWork.Complete();

        _unitOfWork.Dispose();
        
        return Ok(result);
    }

    private void SetRefreshToken(RefreshToken refreshToken)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = refreshToken.Expires,
            SameSite = SameSiteMode.None,
            IsEssential = true,
            Secure = true
        };

        HttpContext.Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);

    }
    private RefreshToken GenerateRefreshToken()
    {
        var refreshToken = new RefreshToken
        {
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
            Expires = DateTime.Now.AddHours(1),
            Created = DateTime.Now
        };

        return refreshToken;
    }
}
*/