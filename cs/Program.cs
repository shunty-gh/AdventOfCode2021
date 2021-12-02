var days = new List<DayBase>
{
    new Day01(),
    new Day02(),
};

days.ForEach(day =>
{
    day.Run();
    Console.WriteLine();
});
