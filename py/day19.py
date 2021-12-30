import os

# https://adventofcode.com/2021/day/19

def distanceM(a, b): # Manhattan distance
    return abs(a[0] - b[0]) + abs(a[1] - b[1]) + abs(a[2] - b[2])

def distanceE(a, b): # Euclidean/Pythagorean distance
    return pow(a[0] - b[0], 2) + pow(a[1] - b[1], 2) + pow(a[2] - b[2], 2)

def coordEquals(c1, c2):
    return c1[0] == c2[0] and c1[1] == c2[1] and c1[2] == c2[2]

def coordAdd(c1, c2):
    return (c1[0] + c2[0], c1[1] + c2[1], c1[2] + c2[2])

def findMatches(scannerA, scannerB):
    """
    Find combinations of beacons from scannerA that are the same distance from
    at least 11 other beacons as those in scannerB (ie at least 12 pairs)
    """

    """
    We're using both manhattan and euclidean distances to be more certain that the
    points align
    """
    distA = scannerA['d']
    distB = scannerB['d']
    matches = []
    for i1,b1 in enumerate(scannerA['b']):
        d1 = distA[i1]
        for i2,b2 in enumerate(scannerB['b']):
            d2 = distB[i2]
            m = set(d1).intersection(d2)
            if len(m) >= 11:
                matches.append((b1, b2))
    return matches

def rotate(coord: tuple[int,int,int], index: int) -> tuple[int,int,int]:
    """Rotate a coordinate through 1 of 24 possible orientations """

    """
    Rotations determined as...
    Imagine a standard 1..6 dice with no. 1 facing forward. With 1 still facing
    forward this can be rotated in 4 unique positions. Each face of the dice can
    be facing forward and each one can be rotated to one of 4 positions. ie 4x6
    different orientations of the scanner.
    """
    x,y,z = coord
    rotations = [
        # rotate about z axis
        (x,y,z),(-y,x,z),(-x,-y,z),(y,-x,z),
        # rotate 90 about y axis then 90,180,270 about z axis
        (-z,y,x),(-y,-z,x), (z,-y,x), (y,z,x),
        # rotate another 90 about y axis then 90,180,270 about z axis
        (-x,y,-z),(-y,-x,-z),(x,-y,-z),(y,x,-z),
        # rotate another 90 about y axis then 90,180,270 about z axis
        (z,y,-x),(-y,z,-x),(-z,-y,-x),(y,-z,-x),
        # rotate (x,y,z) 90 about x axis then 90,180,270 about z axis
        (x,-z,y),(z,x,y),(-x,z,y),(-z,-x,y),
        # rotate (x,y,z) -90 about x axis then 90,180,270 about z axis
        (x,z,-y),(-z,x,-y),(-x,-z,-y),(z,-x,-y)
    ]
    return rotations[index]

def translate(c1: tuple[int,int,int], c2: tuple[int,int,int]) -> tuple[int,int,int]:
    return (c1[0] - c2[0], c1[1] - c2[1], c1[2] - c2[2])

def findTranslation(matches):
    m1A,m1B = matches[0]
    m2A,m2B = matches[1]
    if coordEquals(m1A, m1B):
        return (0, (0,0,0))
    # rotate point for each of 24 rotations then shift to match other item in pair. Then try
    # same translation on second match to see if it fits
    for r in range(24):
        r1 = rotate(m1B, r)
        # shift it so that it matches m1A
        tr1 = translate(m1A, r1)
        # try it on second match
        r2 = rotate(m2B, r)
        tr2 = translate(m2A, r2)
        if coordEquals(tr1, tr2):
            return (r, tr1)
    return None # This shouldn't happen!

## main ##

#with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day19-input-test", "r") as f:   # expect P1: 79, P2: 3621
with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day19-input", "r") as f:
    input = [line.strip() for line in f.readlines()]

scanners = []
for line in input:
    if line.startswith('--'):
        # new scanner
        beacons = []
    elif line == '':
        scanners.append({ 'o': (0,0,0), 'r': 0, 'b': beacons })
    else:
        x,y,z = [int(coord) for coord in line.split(',')]
        beacons.append((x,y,z))
# don't forget the last one
scanners.append({ 'o': (0,0,0), 'r': 0, 'b': beacons })

# Calculate the distance between each beacon in a scanner range and every
# other beacon in the same scanner range. Use both manhattan and euclidean distances
# to be more certain of a match
for scanner in scanners:
    scanner['d'] = []
    for b1 in scanner['b']:
        dists = []
        for b2 in scanner['b']:
            if b1 != b2:
                dm = abs(b1[0] - b2[0]) + abs(b1[1] - b2[1]) + abs(b1[2] - b2[2])
                de = pow(b1[0] - b2[0], 2) + pow(b1[1] - b2[1], 2) + pow(b1[2] - b2[2], 2)
                dists.append((dm, de))
        scanner['d'].append(dists)

beacons = set(scanners[0]['b']) # final list of unique beacon locations
tofind = scanners[1:] # scanners left to locate
q = [scanners[0]] # scanners located and waiting to have their overlaps with other scanners discovered

while q:
    sA = q.pop()
    for sB in tofind.copy():
        matches = findMatches(sA, sB)
        if len(matches) > 0:
            trans = findTranslation(matches)
            if trans is None:
                raise "Can't find translation for scanner. It's all gone Pete Tong!!"
            r,tr = trans
            tofind.remove(sB) # found it, so remove from list of unknowns
            sB['o'] = tr
            sB['r'] = r

            # transform beacon positions, make a new scanner (properly oriented with scanner 0) from the
            # updated beacons and also add each beacon to list/set of located beacons. Add the new
            # scanner to the queue to be searched
            newscanner = { 'o': tr, 'r': r, 'b': [], 'd': sB['d'].copy() }
            q.append(newscanner)
            for b in sB['b']:
                rot = rotate(b, r)
                c = coordAdd(rot, tr)
                newscanner['b'].append(c)
                beacons.add(c)

print("Day 19")
print("  Part 1:", len(beacons))

part2 = 0
for i,s1 in enumerate(scanners):
    for j,s2 in enumerate(scanners[i+1:]):
        d = distanceM(s1['o'], s2['o'])
        if d > part2:
            part2 = d

print("  Part 2:", part2)
