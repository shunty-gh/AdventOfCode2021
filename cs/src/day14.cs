public class Day14 : DayBase
{
    public Day14() : base(14) {}

    public override void Run()
    {
        var lines = LoadLines().ToArray();

        var inserts = new Dictionary<string, char>();
        var start = lines[0];
        for (var i = 2; i < lines.Length; i++)
        {
            var splits = lines[i].Split(" -> ");
            inserts[splits[0]] = splits[1][0]; // only single char
        }

        Console.WriteLine($"Day {DayNumber}");
        Console.WriteLine($"  Part 1: {DoInsertions(start, inserts, 10)}");
        Console.WriteLine($"  Part 2: {DoInsertions(start, inserts, 40)}");
    }

    private Int64 DoInsertions(string start, Dictionary<string, char> insertions, int stepCount)
    {
        // Get pairs from start string
        var pairs = new Dictionary<string, Int64>();
        for (var i = 0; i < start.Length - 1; i++)
        {
            var key = start.Substring(i, 2);
            var v1 = pairs.GetValueOrDefault(key);
            pairs[key] = v1 + 1;
        }

        // Each pair of characters will have a single insertion and can then be split
        // into 2 new pairs (ch[0]+insert and insert+ch[1]). Each of those pairs will appear
        // in the new output as many times as the original pair appeared
        for (var step = 1; step <= stepCount; step++)
        {
            var newpairs = new Dictionary<string, Int64>();
            foreach (var (key, value) in pairs)
            {
                var charToInsert = insertions[key];
                var k1 = $"{key[0]}{charToInsert}";
                var k2 = $"{charToInsert}{key[1]}";
                var v1 = newpairs.GetValueOrDefault(k1);
                var v2 = newpairs.GetValueOrDefault(k2);
                newpairs[k1] = v1 + value;
                newpairs[k2] = v2 + value;
            }
            pairs = newpairs;
        }

        // The pairs list will now contain the total number of appearance of each
        // pair of characters. Therefore the total string length will be the sum of
        // the pair counts + 1. The sum of each character will be the sums of each pair
        // where the character appears / 2 - but we also need to add 1 for the start
        // and end characters before halving the sum.
        var counts = new List<(char Letter, Int64 Count)>();
        foreach (var (key, value) in pairs)
        {
            counts.Add((key[0], value));
            counts.Add((key[1], value));
        }
        // Add the start and end characters once each
        counts.Add((start[0], 1));
        counts.Add((start[start.Length - 1], 1));

        // Sum the counts, divide by 2, sort them and take the highest and lowest
        var freq = counts
            .GroupBy(c => c.Letter)
            .Select(g => new { g.Key, Count = g.Sum(c => c.Count) / 2 })
            .OrderBy(x => x.Count);

        var max = freq.Last().Count;
        var min = freq.First().Count;
        return max - min;
    }
}
