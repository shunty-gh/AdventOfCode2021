public abstract class DayBase
{
    protected readonly int DayNumber = 0;

    public DayBase(int dayNumber)
    {
        DayNumber = dayNumber;
    }

    protected IEnumerable<string> LoadLines()
    {
        var fname = Path.Combine("..", "input", $"day{DayNumber:D2}-input");
        return File.ReadAllLines(fname);
    }

    protected IEnumerable<int> LoadInts()
    {
        var fname = Path.Combine("..", "input", $"day{DayNumber:D2}-input");
        return File.ReadAllLines(fname)
            .Select(s => int.Parse(s));
    }

    public abstract void Run();
}
