from __future__ import annotations
import sys
import os

def sumTo(x: int) -> int:
    return x * (x+1) // 2

def totalFuel(posList: list[int], pos: int) -> tuple[int, int]:
    # This is not the fastest way to do this. But who cares, it's quick enough
    f1 = sum([abs(thisPos - pos) for thisPos in posList])
    f2 = sum([sumTo(abs(thisPos - pos)) for thisPos in posList])
    return f1, f2

with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day07-input", "r") as f:
    input = sorted([int(i) for i in f.readline().strip().split(',')])

# Technically we could do this - but, as usual, it's not part 1 that slows the solution down:
#part1 = sum([abs(thisPos - input[len(input)//2]) for thisPos in input])
part1, part2 = sys.maxsize, sys.maxsize
for i in range(input[0], input[-1]):
    f1, f2 = totalFuel(input, i)
    if f1 < part1:
        part1 = f1

    if f2 < part2:
        part2 = f2

print("Day 7")
print("  Part 1:", part1)
print("  Part 2:", part2)
