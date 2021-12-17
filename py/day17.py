import os
from math import sqrt, trunc

# https://adventofcode.com/2021/day/17

def sumTo(x: int) -> int:
    return (x * (x + 1)) // 2

with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day17-input", "r") as f:
    line = f.readline().strip()
#line = "target area: x=20..30, y=-10..-5"  # expect P1: 45,  P2: 112
x,y = line[len('target area: '):].split(', ')

tx0, tx1 = [int(c) for c in x[2:].split('..')]
ty0, ty1 = [int(c) for c in y[2:].split('..')]

"""
0,0 @ v(7,2) -> 7,2 v(6,1) -> 13,3 v(5,0) -> 18,3 v(4,-1) -> 22,2 v(3,-2) -> 25,0 v(2,-3) -> 27,-3 v(1,-4) -> 28,-7 v(0,-5) -> 28,-12 v(0,-6)
[xn, yn] depend solely on [vx0, vy0] + number of steps and are independent of each other
for step s
  x[s] = sum(1..vx[0]) - sum(1..max(0,vx[0] - s))  ie max x[s] is sum(1..vx[0])
  y[s] = (s * vy[0]) - sum(1..(s - 1))

  y => 1: y0
       2: (y0 + (y0 - 1))
       ...
       6: (y0 + (y0 - 1) + (y0 - 2) + (y0 - 3) + (y0 - 4) + (y0 - 5))

find [vx,s] such that x[s] in tx0..tx1 then find all vy that fall in the target after s steps
initial vx <= tx1 otherwise overshoot target on first step
initial vx => sum(1..vx) >= tx0 otherwise never reach target
intial vy must be within ty0-1..-ty0 otherwise it will miss the target. for +ve initial vy it will come down across the origin with a
velocity of -(vy+1) which means on it's next step it will overshoot the y target if initial vy >= -ty0
"""

vx0 = tx1
lbx = trunc(sqrt(tx0 * 2)) - 1 # lower bound for vx to be able to reach the target
uby = (abs(ty0) * 2) + 1 # upper bound on max number of steps before y has to overshoot
highY = 0
vxy = set() # store distinct initial velocity values for part 2
while vx0 > lbx:
    xmax = sumTo(vx0) # furthest x coord before it drops straight downwards
    # skip those with too low initial x velocity
    if xmax < tx0:
        break

    # find acceptable initial velocities for x
    step = 1
    while step < uby:
        xs = xmax -  sumTo(max(0, vx0 - step))
        if xs > tx1:
            break # overshoot
        elif xs >= tx0: # within target x. now search for suitable y
            # if xs == xmax then it will go straight down so allow to search for y with
            # increasing step values else just this step value
            ubstep = uby if xs == xmax else step + 1
            for ystep in range(step, ubstep):
                sumStepMinus1 = sumTo(ystep - 1)
                for vy0 in range(ty0, -ty0):
                    ys = (ystep * vy0) - sumStepMinus1
                    if ys >= ty0 and ys <= ty1: # bullseye
                        if vy0 > highY: # find the best initial y velocity for part 1
                            highY = vy0
                        vxy.add((vx0, vy0)) # store initial velocity pairs for part 2

        if xs == xmax:
            break
        step += 1

    vx0 -= 1

print("Day 17")
print("  Part 1", sumTo(highY))
print("  Part 2", len(vxy))
