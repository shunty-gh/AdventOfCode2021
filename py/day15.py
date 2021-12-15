from __future__ import annotations
import os
import sys
from collections import deque, Counter, defaultdict

# https://adventofcode.com/2021/day/15

def expandMap(map, expandBy):

    newmap = []
    # expand the existing rows to the new width
    for row in map:
        newrow = []
        newrow.extend(row)
        thisrow = row
        for i in range(expandBy - 1):
            next = [max(1, (x+1) % 10) for x in thisrow]
            newrow.extend(next)
            thisrow = next
        newmap.append(newrow)

    # expand downwards
    lm = len(map)
    for i in range(expandBy - 1):
        for y in range(lm):
            baserow = newmap[-lm]
            newrow = [max(1, (x+1) % 10) for x in baserow]
            newmap.append(newrow)

    return newmap

def getNeighbours(x, y, max):
    dd = [[1,0], [0,-1], [-1,0], [0,1]]
    return [[x+dx,y+dy] for dx,dy in dd if x+dx >= 0 and x+dx < max and y+dy >= 0 and y+dy < max]

def findShortest(map, target):
    # assume target == target X === target Y and start is (0,0) and map is square
    maxlen = len(map)
#    costs = defaultdict(lambda: sys.maxsize)
    costs = {}
    # pre-set manhattan distance for each element
    yc = 0
    for y in range(maxlen):
        xc = 0
        for x in range(maxlen):
            xc += map[y][x]
            costs[(x,y)] = yc + xc
        yc += map[y][0]

    toVisit = deque()
    toVisit.append([0,0,0])
    #shortest = sum(x for x in map[0]) + sum(y[0] for y in map) - map[0][-1] # Manhattan distance as an estimated max starting distance
    shortest = costs[(target,target)]
    while toVisit:
        [x,y,c] = toVisit.popleft()
        if c >= shortest or costs[(x,y)] < c:
            continue

        costs[(x,y)] = c

        neigh = getNeighbours(x, y, maxlen)
        for [nx, ny] in neigh:
            v = map[ny][nx]
            cost = c + v
            if cost > shortest:
                continue

            if costs[(nx,ny)] > cost:
                costs[(nx,ny)] = cost
                if nx == target and ny == target:
                    shortest = cost
                else:
                    toVisit.append([nx, ny, cost])
    return shortest

with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day15-input", "r") as f:
    input = [line.strip() for line in f.readlines()]

# input = [
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
print("  Part 1", findShortest(map, len(map[0]) - 1))

map = expandMap(map, 5)
print("  Part 2", findShortest(map, len(map[0]) - 1))
