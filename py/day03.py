import os

def filterLines(lines: list[str], idx: int, selectMost: bool) -> list[str]:
    if len(lines) == 1:
        return lines

    zc = sum(line[idx] == '0' for line in lines)
    mostch = '1' if len(lines) - zc >= zc else '0'
    leastch = '0' if mostch == '1' else '1'
    selectch = mostch if selectMost else leastch
    return [line for line in lines if line[idx] == selectch]

def filterInput(lines: list[str], selectMost: bool) -> str:
    filtered = lines.copy()
    idx = 0
    while len(filtered) > 1:
        filtered = filterLines(filtered, idx, selectMost)
        idx += 1
    return filtered[0]

#
# Main
#
with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day03-input", "r") as f:
    input = [line.strip() for line in f.readlines()]

bitlen, linecount = len(input[0]), len(input)
counts = [0] * bitlen
for line in input:
    for idx in range(bitlen):
        if line[idx] == '1':
            counts[idx] += 1

# Take the counts array, treat > half as '1' and < half as '0' and convert 'binary' string to int
half = linecount / 2
mostCommon = int("".join(['1' if c > half else '0' for c in counts]), 2)
leastCommon = int("".join(['0' if c > half else '1' for c in counts]), 2)

# Part 2
mosts = filterInput(input, True)
leasts = filterInput(input, False)

print("Day 3")
print("  Part 1:", mostCommon * leastCommon)
print("  Part 2:", int(mosts, 2) * int(leasts, 2))
