public class Day03 : DayBase
{
    public Day03() : base(3) {}

    public override void Run()
    {
        var lines = LoadLines().ToList();
        var ll = lines[0].Length;
        int lc = lines.Count, half = lc / 2;
        var bitcounts = new int[ll];
        lines.ForEach(line =>
        {
            for (var i = 0; i < ll; i++)
            {
                if (line[i] == '1')
                    bitcounts[i] += 1;
            }
        });
        var gamma = Convert.ToInt32(new string(bitcounts.Select(c => c > half ? '1' : '0').ToArray()), 2);
        var epsilon = Convert.ToInt32(new string(bitcounts.Select(c => c < half ? '1' : '0').ToArray()), 2);

        // Part 2
        var ogr = Convert.ToInt32(FilterLines(lines, true), 2);
        var csr = Convert.ToInt32(FilterLines(lines, false), 2);

        Console.WriteLine($"Day {DayNumber}");
        Console.WriteLine($"  Part 1: {gamma * epsilon}");
        Console.WriteLine($"  Part 2: {ogr * csr}");
    }

    private string FilterLines(IEnumerable<string> lines, bool getMost)
    {
        var filtered = lines.ToList();
        var index = 0;
        while (filtered.Count > 1)
        {
            var onecount = filtered.Count(line => line[index] == '1');
            var mostch = filtered.Count - onecount > onecount ? '0' : '1';
            var leastch = mostch == '1' ? '0' : '1';
            var ch = getMost ? mostch : leastch;
            filtered = filtered.Where(line => line[index] == ch).ToList();

            index++;
        }
        return filtered[0];
    }
}
