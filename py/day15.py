from __future__ import annotations
import os
import sys
import heapq
from collections import defaultdict

# https://adventofcode.com/2021/day/15

def expandMap(map, expandBy):
    lm = len(map) # assume map is square
    result = []
    # expand the existing rows to the new width
    for row in map:
        newrow = row.copy()
        for _ in range(expandBy - 1):
            newrow.extend([max(1, (x+1) % 10) for x in newrow[-lm:]])
        result.append(newrow)

    # expand downwards
    for _ in range(expandBy - 1):
        for _ in range(lm):
            result.append([max(1, (x+1) % 10) for x in result[-lm]])

    return result

def getNeighbours(x, y, max):
    dd = [[1,0], [0,-1], [-1,0], [0,1]]
    return [[x+dx,y+dy] for dx,dy in dd if x+dx >= 0 and x+dx < max and y+dy >= 0 and y+dy < max]

def findShortest(map):
    # assume target is bottom right, start is (0,0) and map is square
    mlen = len(map)
    target = mlen - 1
    costs = defaultdict(lambda: sys.maxsize)
    costs[(0,0)] = 0
    toVisit = [(0,0,0)]
    #shortest = sum(x for x in map[0]) + sum(y[0] for y in map) - map[0][-1] # Manhattan distance as an estimated initial distance. Makes very little (if any) difference to overall runtime.
    shortest = sys.maxsize
    while toVisit:
        c,x,y = heapq.heappop(toVisit)
        if c >= shortest or c > costs[(x,y)]:
            continue

        neigh = getNeighbours(x, y, mlen)
        for [nx,ny] in neigh:
            cost = c + map[ny][nx]
            if cost > shortest:
                continue

            if cost < costs[(nx,ny)]:
                costs[(nx,ny)] = cost
                if nx == target and ny == target:
                    shortest = cost
                else:
                    heapq.heappush(toVisit, (cost, nx, ny))
    return shortest

with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day15-input", "r") as f:
    input = [line.strip() for line in f.readlines()]

# input = [              # expect P1: 40; P2: 315
#     '1163751742',
#     '1381373672',
#     '2136511328',
#     '3694931569',
#     '7463417111',
#     '1319128137',
#     '1359912421',
#     '3125421639',
#     '1293138521',
#     '2311944581',
# ]
map = []
for line in input:
    map.append([int(x) for x in line])

print("Day 15")
print("  Part 1", findShortest(map))

map = expandMap(map, 5)
print("  Part 2", findShortest(map))
