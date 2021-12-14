from __future__ import annotations
import os
from collections import Counter

# https://adventofcode.com/2021/day/14
# See the ../cs/src/day14.cs version for a bit of explanation

def insert(start: str, inserts: dict[str,str], steps: int) -> int:
    # get pairs from start text
    pairs = Counter()
    for i in range(len(start) - 1):
        pairs[start[i:i+2]] += 1

    # insert a char and transform each pair into two new pairs and increment their count
    for i in range(steps):
        pairs2 = Counter()
        for k,v in pairs.items():
            toInsert = inserts[k]
            pairs2[k[0] + toInsert] += v
            pairs2[toInsert + k[1]] += v
        pairs = pairs2

    # group and sum individual characters. Only take the first ch of each pair
    # but then add +1 for the final character of the start string too (as it will always
    # be the last character of any output string and hence never the first ch of a pair)
    chars = Counter()
    chars[start[-1]] = 1
    for k in pairs:
        chars[k[0]] += pairs[k]

    return (max(chars.values()) - min(chars.values()))

## main
with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day14-input", "r") as f:
    lines = f.readlines()

start = lines[0].strip()
inserts = {}
for line in [line.strip() for line in lines if ' -> ' in line]:
    src, dest = line.split(' -> ')
    inserts[src] = dest

print("Day 14")
print("  Part 1", insert(start, inserts, 10))
print("  Part 2", insert(start, inserts, 40))
