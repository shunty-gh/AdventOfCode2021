import os

def filterLines(lines: list[str], idx: int, selectMost: bool) -> list[str]:
    if len(lines) == 1:
        return lines

    ones = []
    zeros = []
    for line in lines:
        if line[idx] == '1':
            ones.append(line)
        else:
            zeros.append(line)

    lone, lzero = len(ones), len(zeros)
    if selectMost:
        return ones if lone >= lzero else zeros
    else:
        return zeros if lone >= lzero else ones

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
half, mostCommon, leastCommon = linecount / 2, 0, 0
for idx in range(bitlen):
    if counts[idx] > half:
        mostCommon += 1 << bitlen - idx - 1
    else:
        leastCommon += 1 << bitlen - idx - 1

# Part 2
mosts = filterInput(input, True)
leasts = filterInput(input, False)

print("Day 3")
print("  Part 1:", mostCommon * leastCommon)
print("  Part 2:", int(mosts, 2) * int(leasts, 2))
