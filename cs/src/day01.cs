public class Day01
{
    private const int DayNumber = 1;

    public void Run()
    {
        var fname = Path.Combine("..", "input", $"day{DayNumber:D2}-input");
        var readings = File.ReadAllLines(fname)
            .Select(s => int.Parse(s))
            .ToList();

        /// The LINQ (and "not easily debuggable") way
        var part1 = readings
            .Where((r, i) => i > 0 && r > readings[i-1])
            .Count();
        var part2 = readings
            .Where((r, i) => i > 0 && readings.Skip(i).Take(3).Sum() > readings.Skip(i-1).Take(3).Sum())
            .Count();

        /// The 'traditional' way
        // var part1 = 0;
        // for (var i = 1; i < readings.Count; i++)
        // {
        //     part1 += readings[i] > readings[i-1] ? 1 : 0;
        // }

        // var part2 = 0;
        // var wina = readings.Take(3).Sum();
        // foreach (var i in Enumerable.Range(1, readings.Count - 2))
        // {
        //     var winb = readings.Skip(i).Take(3).Sum();
        //     part2 += winb > wina ? 1 : 0;
        //     wina = winb;
        // }

        Console.WriteLine($"Day {DayNumber}");
        Console.WriteLine($"  Part 1: {part1}");
        Console.WriteLine($"  Part 2: {part2}");
    }
}
