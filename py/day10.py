import os

# https://adventofcode.com/2021/day/10

with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day10-input", "r") as f:
    input = [line.strip() for line in f.readlines()]

corruptscores = [3, 57, 1197, 25137]
opench = [ '(', '[',  '{',   '<' ]
closech = [ ')', ']',  '}',   '>' ]

part1 = 0
autocomp = []
for line in input:
    stack = []
    corrupt = False
    for ch in line:
        if ch in opench:
            stack.append(ch)
        else:
            lastopen = stack.pop()
            if closech[opench.index(lastopen)] != ch:
                corrupt = True
                part1 += corruptscores[closech.index(ch)]
                break

    if not corrupt:
        score = 0
        while stack:
            opener = stack.pop()
            score = (score * 5) + opench.index(opener) + 1 # autocomplete scores are [1,2,3,4]
        autocomp.append(score)

autocomp.sort()
mid = (len(autocomp) - 1) // 2 # according to the puzzle text len() is always going to be odd for the autocomplete items
print("Day 10")
print("  Part 1:", part1)
print("  Part 2:", autocomp[mid])