# Actual input
# Player 1 starting position: 10
# Player 2 starting position: 3

# Test input - expect P1: 739785; P2: 444356092776315
# Player 1 starting position: 4
# Player 2 starting position: 8

start1, start2 = 4, 8 # test
start1, start2 = 10, 3 # actual

def deterministiRoll(rollNo):
    rollbase = (3 * rollNo) - 2
    return (3 * rollbase) + 3

p1, p2 = start1, start2
s1, s2, rolls = 0, 0, 0
while True:
    rolls += 1
    p1 = (((p1 - 1) + (deterministiRoll(rolls) % 10)) % 10) + 1
    s1 += p1
    if s1 >= 1000:
        break

    rolls += 1
    p2 = (((p2 - 1) + (deterministiRoll(rolls) % 10)) % 10) + 1
    s2 += p2
    if s2 >= 1000:
        break

print("Day 21")
print("  Part 1:", min(s1, s2) * rolls * 3) # 3 rolls per deterministic 'roll'

scoreCache = {}
target = 21
def play(p1: int, s1: int, p2: int, s2: int):
    if s1 >= target:
        return (1,0)
    if s2 >= target:
        return (0,1)
    if (p1, s1, p2, s2) in scoreCache:
        return scoreCache[(p1, s1, p2, s2)]

    score = (0,0)
    for roll in [3,4,4,4,5,5,5,5,5,5,6,6,6,6,6,6,6,7,7,7,7,7,7,8,8,8,9]: # 'Pythonic' way would prob be "for r1 in [1,2,3]:\n for r2 in [1,2,3]:\n for r3 in [1,2,3]:\n..."
        nextP1 = (p1 - 1 + roll) % 10 + 1

        next = play(p2, s2, nextP1, s1 + nextP1)
        score = (score[0] + next[1], score[1] + next[0])

    scoreCache[(p1, s1, p2, s2)] = score
    return score

p1, p2 = start1, start2
wins = play(p1, 0, p2, 0)
print("  Part 2:", max(wins))
