using System.Text;

public class Day14 : DayBase
{
    public Day14() : base(14) {}

    public override void Run()
    {
        var lines = LoadLines().ToArray();

        var inserts = new Dictionary<string, char>();
        var charcount = new Dictionary<char, Int64>();
        var start = lines[0];
        for (var i = 2; i < lines.Length; i++)
        {
            var splits = lines[i].Split(" -> ");
            inserts[splits[0]] = splits[1][0]; // only single char
        }

        foreach (var ch in start)
        {
            var v = charcount.GetValueOrDefault(ch, 0);
            charcount[ch] = v + 1;
        }

        var s = start;
        for (var step = 0; step < 10; step++)
        {
            var sb = new StringBuilder(s.Length * 2);
            sb.Append(s[0]);
            for (var i = 0; i < s.Length - 1; i++)
            {
                var key = s.Substring(i, 2);
                var insert = inserts[key];
                var v = charcount.GetValueOrDefault(insert, 0);
                charcount[insert] = v + 1;

                sb.Append(insert);
                sb.Append(s[i+1]);
            }
            s = sb.ToString();
        }

        var max = charcount.Max(kvp => kvp.Value);
        var min = charcount.Min(kvp => kvp.Value);
        Console.WriteLine($"Max {max}; Min {min}");
        var part1 = max - min;

        Console.WriteLine($"Day {DayNumber}");
        Console.WriteLine($"  Part 1: {part1}");
        Console.WriteLine($"  Part 2: {0}");
    }
}
