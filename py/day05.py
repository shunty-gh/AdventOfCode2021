from collections import Counter

# https://adventofcode.com/2021/day/5

def intersectionCount(lineSegments, includeDiagonals):
    counts = Counter()
    for seg in lineSegments:
        xmin, xmax = min(seg[0][0], seg[1][0]), max(seg[0][0], seg[1][0])
        ymin, ymax = min(seg[0][1], seg[1][1]), max(seg[0][1], seg[1][1])
        if xmin == xmax or ymin == ymax: # straight lines
            for x in range(xmin, xmax + 1):
                for y in range(ymin, ymax + 1):
                    counts[(x,y)] += 1
        elif includeDiagonals:
            # which point (to or from) has the smaller x?
            pfrom = seg[0] if seg[0][0] == xmin else seg[1]
            pto = seg[1] if seg[0][0] == xmin else seg[0]
            dy = 1 if pfrom[1] < pto[1] else -1 # line goes up l->r or down?
            for x in range(xmax - xmin + 1): # for a 45° diagonal line x and y increment by the same amount
                counts[(pfrom[0]+x, pfrom[1]+(dy*x))] += 1

    return sum(1 for v in counts.values() if v > 1)

with open("../input/day05-input", "r") as f:
    input = [x.split(' -> ') for x in [line.strip() for line in f.readlines()]]
segments = []
for seg in input:
    x1,y1 = [int(s) for s in seg[0].split(',')]
    x2,y2 = [int(s) for s in seg[1].split(',')]
    segments.append([(x1,y1), (x2,y2)])

print("Day 5")
print("  Part 1:", intersectionCount(segments, False))
print("  Part 2:", intersectionCount(segments, True))
