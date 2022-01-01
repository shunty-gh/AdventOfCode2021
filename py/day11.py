# https://adventofcode.com/2021/day/11

with open("../input/day11-input", "r") as f:
    input = [line.strip() for line in f.readlines()]

seaO = []
for line in input:
    seaO.append([[int(c),False] for c in line])

rlen = len(seaO[0]) # assume square
sea = seaO.copy()
p1steps = 100
flashes, step = 0, 0
while True:
    step += 1
    # inc power
    for r in sea:
        for c in r:
            c[0] += 1
    # flash
    flashed = True
    while flashed:
        flashed = False
        for y,r in enumerate(sea):
            for x,c in enumerate(r):
                if c[0] > 9 and not c[1]:
                    for dx,dy in [(1,0),(1,1),(0,1),(-1,1),(-1,0),(-1,-1),(0,-1),(1,-1)]:
                        if x+dx >= 0 and x+dx < rlen and y+dy >= 0 and y+dy < rlen:
                            n = sea[y+dy][x+dx]
                            n[0] += 1
                    c[1] = True
                    flashed = True
                    flashes += 1
    # reset
    allZero = True
    for r in sea:
        for c in r:
            if c[0] > 9:
                c[0] = 0
                c[1] = False
            if c[0] > 0:  # part 2 check
                allZero = False

    if step == p1steps:
        part1 = flashes

    if allZero:  # everyone has just flashed
        part2 = step
        break

print("Day 11")
print("  Part 1:", part1)
print("  Part 2:", part2)
