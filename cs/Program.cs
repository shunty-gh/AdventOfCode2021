var days = new List<DayBase>
{
    new Day01(),
    new Day02(),
    new Day03(),
};

days.ForEach(day =>
{
    day.Run();
    Console.WriteLine();
});
