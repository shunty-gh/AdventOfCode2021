import os

with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day02-input", "r") as f:
    input = [line.split(' ') for line in f.readlines()]

x, y1, y2, a = 0,0,0,0
for i in input:
    v = int(i[1])
    if i[0] == 'forward':
        x += v
        y2 += (a * v)
    elif i[0] == 'down':
        y1 += v
        a += v
    else:
        y1 -= v
        a -= v

print("Day 2")
print("  Part 1:", x * y1)
print("  Part 2:", x * y2)
