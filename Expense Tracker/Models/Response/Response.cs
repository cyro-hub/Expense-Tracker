namespace Expense_Tracker.Models.Response;

public class Responses<T>
{
    public T? Data { get; set; }
    public int StatusCode { get; set; }
    public string StatusMessage { get; set; }
    public int NumberOfPages { get; set; }
    public int CurrentPage { get; set; }
    public bool IsSuccess { get; set; }
}
