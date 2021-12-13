import os

# https://adventofcode.com/2021/day/13

def foldValue(foldVal, val):
    return val if val < foldVal else foldVal - (val - foldVal)

def fold(dots, fold):
    result = {}
    for dot in dots:
        if fold[0] == 0: # fold along y=?, x stays the same
            result[(dot[0], foldValue(fold[1], dot[1]))] = True
        else:            # fold along x=?, y stays the same
            result[(foldValue(fold[0], dot[0]), dot[1])] = True
    return result

def draw(dots):
    xsort = sorted(dots, key = lambda k: k[0])
    minx = xsort[0][0]
    maxx = xsort[-1][0]
    ysort = sorted(dots, key = lambda k: k[1])
    miny = ysort[0][1]
    maxy = ysort[-1][1]
    for y in range(miny, maxy + 1):
        line = ''
        for x in range(minx, maxx + 1):
            line += '#' if (x,y) in dots else ' '
        print('    ' + line)

foldTextLen = len('fold along ')
folds = []
dots = {}
with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day13-input", "r") as f:
    for line in [line.strip() for line in f.readlines()]:
        if line.startswith("fold"):
            f = line[foldTextLen:].split('=')
            v = int(f[1])
            folds.append([v, 0] if f[0] == 'x' else [0, v])
        elif line:
            dot = (int(line.split(',')[0]), int(line.split(',')[1]))
            dots[dot] = True

print("Day 13")
print("  Part 1", len(fold(dots, folds[0])))

part2 = dots
for f in folds:
    part2 = fold(part2, f)

print("  Part 2")
draw(part2)

