import os

with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day01-input", "r") as f:
    input = [int(line) for line in f.readlines()]

part1 = 0
part2 = 0

for i in range(1, len(input)):
    if input[i] > input[i-1]:
        part1 += 1

wa = input[0] + input[1] + input[2]
wb = wa
for i in range(2, len(input) - 1):
    wb = wb - input[i-2] + input[i+1]
    if wb > wa:
        part2 += 1
    wa = wb

print("Day 1")
print("  Part 1:", part1)
print("  Part 2:", part2)
