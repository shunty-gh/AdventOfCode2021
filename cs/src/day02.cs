public class Day02 : DayBase
{
    public Day02() : base(2) {}

    public override void Run()
    {
        var lines = LoadLines()
            .Select(s => new
            {
                direction = s.Split(' ')[0],
                amount = int.Parse(s.Split(' ')[1])
            });

        int x = 0, y1 = 0, y2 = 0, aim = 0;
        foreach (var line in lines)
        {
            switch (line.direction)
            {
                case "forward":
                    x += line.amount;
                    y2 += (aim * line.amount);
                    break;
                case "down":
                    y1 += line.amount;
                    aim += line.amount;
                    break;
                case "up":
                    y1 -= line.amount;
                    aim -= line.amount;
                    break;
                default:
                    throw new Exception($"Unknown direction {line.direction}");
            }
        }
        Console.WriteLine($"Day {DayNumber}");
        Console.WriteLine($"  Part 1: {x * y1}");
        Console.WriteLine($"  Part 2: {x * y2}");
    }
}
