namespace Expense_Tracker.Models.Response;

public class Report
{
    public decimal Income { get; set; }
    public decimal Outcome { get; set; }

    private string Month;

    public string Fullmonth
    {
        get { return Month; }

        set { Month = new DateTime(1, int.Parse(value), 1).ToString("MMMM"); }
    }
}
