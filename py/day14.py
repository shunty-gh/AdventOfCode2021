from __future__ import annotations
import os
from collections import defaultdict

# https://adventofcode.com/2021/day/14
# See the ../cs/src/day14.cs version for a bit of explanation

def insert(start: str, inserts: dict[str,str], steps: int) -> int:
    # get pairs from start text
    pairs: defaultdict[str,int] = defaultdict(lambda: 0)
    for i,_ in enumerate(start[0:-1]):
        key = start[i:i+2]
        pairs[key] = pairs[key] + 1

    for i in range(steps):
        pairs2: defaultdict[str,int] = defaultdict(lambda: 0)
        for k,v in pairs.items():
            toInsert = inserts[k]
            k1 = k[0] + toInsert
            k2 = toInsert + k[1]
            pairs2[k1] = pairs2[k1] + v
            pairs2[k2] = pairs2[k2] + v
        pairs = pairs2

    # group and sum individual characters
    chars = defaultdict(lambda: 0)
    chars[start[0]] = 1
    chars[start[-1]] = 1
    for k,v in pairs.items():
        chars[k[0]] += v
        chars[k[1]] += v

    cmax = max([v for v in chars.values()]) // 2
    cmin = min([v for v in chars.values()]) // 2
    return cmax - cmin

## main
with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day14-input", "r") as f:
    lines = f.readlines()

start = lines[0].strip()
inserts = {}
for line in [line.strip() for line in lines]:
    if line and ' -> ' in line:
        src, dest = line.split(' -> ')
        inserts[src] = dest

print("Day 14")
print("  Part 1", insert(start, inserts, 10))
print("  Part 2", insert(start, inserts, 40))
