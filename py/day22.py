import os

# https://adventofcode.com/2021/day/22

def cubeSize(x,y,z):
    result = (x[1] - x[0] + 1) * (y[1] - y[0] + 1) * (z[1] - z[0] + 1)
    assert result > 0, "Ouch - -ve cube size"
    return result

def axisIntersection(a1, a2):
    f = max(a1[0], a2[0])
    t = min(a1[1], a2[1])
    if t - f <= 0:
        return None
    return (f,t)

def getIntersectionCube(c1, c2):
    x = axisIntersection(c1['x'], c2['x'])
    y = axisIntersection(c1['y'], c2['y'])
    z = axisIntersection(c1['z'], c2['z'])

    if x is None or y is None or z is None:
        return None
    return { 'st': 1, 'x': x, 'y': y, 'z': z, 'sz': cubeSize(x,y,z) }


# line eg: off x=38069..68642,y=22516..48066,z=-58252..-38667
with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day22-input", "r") as f:
#with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day22-input-test", "r") as f:
    input = [line.strip() for line in f.readlines()]

steps = []
for line in input:
    state, coords = line.split(' ')
    st = 1 if state.strip() == 'on' else -1
    x,y,z = coords.split(',')
    xf,xt = [int(c) for c in x[2:].split('..')]
    yf,yt = [int(c) for c in y[2:].split('..')]
    zf,zt = [int(c) for c in z[2:].split('..')]

    steps.append({ 'st': st, 'x': (xf, xt), 'y': (yf, yt), 'z': (zf, zt), 'sz': cubeSize((xf,xt), (yf,yt), (zf,zt)) })

reactor = {}
for step in steps:
    xmn = max(-50, step['x'][0])
    xmx = min(50, step['x'][1])
    ymn = max(-50, step['y'][0])
    ymx = min(50, step['y'][1])
    zmn = max(-50, step['z'][0])
    zmx = min(50, step['z'][1])

    for z in range(zmn, zmx + 1):
        for y in range(ymn, ymx + 1):
            for x in range(xmn, xmx + 1):
                reactor[(x,y,z)] = step['st']

print("Day 22")
print("  Part 1:", sum([1 if v > 0 else 0 for v in reactor.values()]))

# Part 2
# Slow - but it works
# Would be quicker to iterate the instructions in reverse and
# add just the sizes of the 'on' cubes less the sizes of prior intersections
# but I can't quite get the logic right and can't be bothered to spend
# any more time on it for now
seen = [steps[0]]
for cube in steps[1:]:
    toappend = []
    for s in seen:
        # get the intersection of the current cube with every cube/intersection
        # already seen and mark it as 'add' or 'subtract' as appropriate
        intersect = getIntersectionCube(cube, s)
        if intersect: # is not None:
            if s['st'] == 1:
                intersect['st'] = -1
                intersect['sz'] *= -1
            toappend.append(intersect)
    if cube['st'] == 1:
        toappend.append(cube)
    seen.extend(toappend)

print("  Part 2:", sum([c['sz'] for c in seen]))
