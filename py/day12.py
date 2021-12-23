import os
from collections import defaultdict

# https://adventofcode.com/2021/day/12

def uniquePathCount(caves: dict[str,list[str]], part: int) -> int:
    paths = set()
    tovisit = [('start','start', False)]
    while tovisit:
        k,path, hasdup = tovisit.pop()

        for c in caves[k]:
            if c == 'end':
                paths.add(path+'_'+c)
            elif c.isupper() or c not in path:
                tovisit.append((c, path+c, hasdup))
            elif part == 2 and not hasdup and c != 'start':
                tovisit.append((c, path+'_'+c, True))
    return len(paths)

caves = defaultdict(lambda: [])
with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day12-input", "r") as f:
    for line in [line.strip().split('-') for line in f.readlines()]:
        caves[line[0]].append(line[1])
        caves[line[1]].append(line[0])

print("Day 12")
print("  Part 1:", uniquePathCount(caves, 1))
print("  Part 2:", uniquePathCount(caves, 2))
