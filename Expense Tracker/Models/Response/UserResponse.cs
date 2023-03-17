namespace Expense_Tracker.Models.Response;

public class UserResponse
{
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
    public int StatusCode { get; set; }
    public string StatusMessage { get; set; }
    public int NumberOfPages { get; set; }
    public int CurrentPage { get; set; }
    public bool IsSuccess { get; set; }
    public UserResponseDTO UserInfo { get; set; }
}
