import os
from collections import defaultdict

# https://adventofcode.com/2021/day/25

def nextPos(x,y,mx,my,ch):
    if ch == '>':
        return ((x+1) % mx,y)
    elif ch == 'v':
        return (x,(y+1) % my)
    else:
        return (x,y)

def dump(map,mx,my):
    for y in range(my):
        s = ''
        for x in range(mx):
            s += map[(x,y)]
        print(s)
    print('')

def run(map, mx, my):
    m = map.copy()
    steps = 0
    while True:
        moved = False
        steps += 1
        ch = '>'
        #dump(m,mx,my)
        m2 = {}
        for y in range(my):
            for x in range(mx):
                if m[(x,y)] == ch:
                    np = nextPos(x,y,mx,my,ch)
                    if m[np] == '.':
                        m2[(x,y)] = '.'
                        m2[np] = ch
                        moved = True
                    else:
                        m2[(x,y)] = m[(x,y)]
                elif (x,y) not in m2:
                    m2[(x,y)] = m[(x,y)]
        m = m2
        m2 = {}
        ch = 'v'
        for y in range(my):
            for x in range(mx):
                if m[(x,y)] == ch:
                    np = nextPos(x,y,mx,my,ch)
                    if m[np] == '.':
                        m2[(x,y)] = '.'
                        m2[np] = ch
                        moved = True
                    else:
                        m2[(x,y)] = m[(x,y)]
                elif (x,y) not in m2:
                    m2[(x,y)] = m[(x,y)]

        m = m2

        if not moved:
            print('no movement after', steps)
            break

        if steps % 100 == 0:
            print(steps, 'steps')

with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day25-input", "r") as f:
    input = [line.strip() for line in f.readlines()]

# input = [
#     'v...>>.vv>',
#     '.vv>>.vv..',
#     '>>.>v>...v',
#     '>>v>>.>.v.',
#     'v>v.vv.v..',
#     '>.>>..v...',
#     '.vv..>.>v.',
#     'v.v..>>v.v',
#     '....v..v.>',
# ]

map = defaultdict()
xmax = len(input[0])
ymax = len(input)
for y,line in enumerate(input):
    for x,ch in enumerate(line):
        map[(x,y)] = ch

#print(map,xmax,ymax)
run(map,xmax,ymax)

print("Day 25")
print("  Part 1:", 0)
print("  Part 2:", 0)
