import os

# https://adventofcode.com/2021/day/20

def enhance(grid, rounds, iea, xMin, xMax, yMin, yMax):
    neighbours = [[-1,-1],[0,-1],[1,-1],[-1,0],[0,0],[1,0],[-1,1],[0,1],[1,1]]

    """
    The image enhancement string we are given has '#' as the first character. This means that any dark pixel
    surrounded by dark pixels (ie the whole empty, infinite universe), will be lit after round one. However
    after round 2 any lit pixel surrounded by lit pixels (ie the infinite universe after round 1) will be dark
    due to the last character of the IEA string being '.' and so on after each round
    """

    map = grid.copy()
    for round in range(1,rounds+1):
        mapnext = {}
        for y in range(yMin - 2, yMax + 2):
            for x in range(xMin - 2, xMax + 2):
                numstr = ''
                for [dx,dy] in neighbours:
                    xx, yy = x+dx, y+dy
                    if xx < xMin or xx >= xMax or yy < yMin or yy >= yMax: # outside the currently mapped universe
                        numstr += iea[-1] if round % 2 == 1 else iea[0]
                    else:
                        numstr += map[(xx,yy)]

                mapnext[(x,y)] = iea[int(numstr.replace('#', '1').replace('.', '0'), 2)]

        map = mapnext
        # the mapped universe is expanding...
        xMin -= 2
        xMax += 2
        yMin -= 2
        yMax += 2

    return sum([1 for pixel in map.values() if pixel == '#'])

## main

with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day20-input", "r") as f:
    input = [line.strip() for line in f.readlines()]

iea = input[0]
grid = {}
xMax = len(input[2])
yMax = len(input) - 2

for y in range(yMax):
    for x in range(xMax):
        grid[(x,y)] = input[y+2][x]

print("Day 20")
print("  Part 1", enhance(grid, 2, iea, 0, xMax, 0, yMax))
print("  Part 2", enhance(grid, 50, iea, 0, xMax, 0, yMax))
