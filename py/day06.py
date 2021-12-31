# https://adventofcode.com/2021/day/6

def run(start, days):
    counts = start.copy()
    for d in range(days):
        c0 = counts[0]
        for i in range(8):
            counts[i] = counts[i+1]
        counts[6] += c0
        counts[8] = c0

    return sum(counts)

counts = [0] * 9
with open("../input/day06-input", "r") as f:
    for x in [int(x) for x in f.readline().strip().split(',')]:
        counts[x] += 1

print("Day 6")
print("  Part 1:", run(counts, 80))
print("  Part 2:", run(counts, 256))
