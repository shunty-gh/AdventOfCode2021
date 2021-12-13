from __future__ import annotations
import os

# https://adventofcode.com/2021/day/9

# assume a 2d grid with +ve co-ords of x: 0..www, y: 0..hhh.
# (0,0) top left corner. x inc r to l, y inc top to bottom

def getNeighbours(x: int, y: int, width: int, height: int) -> list[tuple[int, int]]:
    # neighbours are only horizontal and vertical - not diagonal
    result = []
    for dx,dy in [[0,-1], [-1,0], [0,1], [1,0]]:
        if x + dx >= 0 and x + dx < width and y + dy >= 0 and y + dy < height:
            result.append((x+dx, y+dy))
    return result

def lowPointValue(map: list[str], x, y: int) -> tuple[bool, int]:
    www, hhh = len(map[0]), len(map)
    v = int(map[y][x])
    for n in getNeighbours(x, y, www, hhh):
        if int(map[n[1]][n[0]]) <= v: # if any neighbour has a lower value then this isn't a lowest point
            return False, 0
    return True, v

# basic DFS to find all reachable 'neighbours' < 9
def getBasinSize(map: list[str], x: int, y: int) -> int:
    www, hhh = len(map[0]), len(map)
    result = 0
    visited = set()
    tovisit = [(x,y)]
    while len(tovisit) > 0:
        pt = tovisit.pop()
        if pt in visited or int(map[pt[1]][pt[0]]) == 9: # 9 counts as a boundary and isn't 'in' any basin
            continue

        result += 1
        visited.add(pt)

        for n in getNeighbours(pt[0], pt[1], www, hhh):
            if n not in visited and int(map[n[1]][n[0]]) < 9:
                tovisit.append(n)

    return result

with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day09-input", "r") as f:
    input = [line.strip() for line in f.readlines()]
    # input = ['2199943210', '3987894921', '9856789892', '8767896789', '9899965678'] # expect P1: 15; P2: 1134

part1 = 0
basins = []
for iy, y in enumerate(input):
    for ix in range(len(y)):
        ok, lpv = lowPointValue(input, ix, iy)
        part1 += (lpv + 1) if ok else 0
        if ok:
            basins.append(getBasinSize(input, ix, iy))

basins.sort(reverse=True)

print("Day 9")
print("  Part 1:", part1)
print("  Part 2:", basins[0] * basins[1] * basins[2])
