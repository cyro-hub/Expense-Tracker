using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Expense_Tracker.Core;

public class DateOnlyConverter : ValueConverter<DateOnly, DateTime>
{
    public DateOnlyConverter()
        : base(dateOnly =>
                dateOnly.ToDateTime(TimeOnly.MinValue),
            dateTime => DateOnly.FromDateTime(dateTime))
    { }
}