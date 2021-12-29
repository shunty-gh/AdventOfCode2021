import os
from threading import Thread

# https://adventofcode.com/2021/day/24   # part 2

def run(program: list[list[str]], input: list[int]):
    reg = { 'w': 0, 'x': 0, 'y': 0, 'z': 0 }
    inp = input.copy()
    for op,a,b in program:
        va = reg[a]
        vb = reg[b] if b.isalpha() else 0 if b == ' ' or b == '' else int(b)

        if op == 'inp':
            if len(inp) == 0:
                break
            reg[a] = inp[0]
            inp = inp[1:]
        elif op == 'add':
            reg[a] += vb
        elif op == 'mul':
            reg[a] *= vb
        elif op == 'div':
            reg[a] = va // vb
        elif op == 'mod':
            reg[a] = va % vb
        elif op == 'eql':
            reg[a] = 1 if va == vb else 0

    return reg['z']

def runBase(instructions, startNum):
    result = []
    zstates = {}
    zstates[(0)] = startNum.copy()
    for i in range(len(startNum),14):
        zs2 = {}
        for zs in zstates:
            #for j in range(9,0,-1):
            for j in range(1,10):
                n = zstates[zs].copy()
                n.append(j)
                z = run(instructions, n)
                if z == 0 and i == 13:
                    result = n.copy()
                    print("Part 2", result)
                    break
                if not (z) in zs2:
                    zs2[(z)] = n
            if len(result) == 14:
                break
        zstates = zs2
    if len(result) == 0:
        print("No result found starting with:", startNum)
    return result

instructions = []
with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day24-input", "r") as f:
    for line in [line.strip() for line in f.readlines()]:
        inst = line.split(' ')
        instructions.append((inst[0], inst[1], inst[2] if len(inst) == 3 else ' '))

results = []
tasks = []
# A bit of analysis of our input shows that for z to decrease asap
# we need (z%26)-8 to equal w (the input character) for the fourth
# element of the input. The only way this can happen is for the third
# element to be 1 and the fourth to be 9. Use this fact to brute force
# the rest...
for m in range(1,10):
    for n in range(1,10):
        t = Thread(target=runBase, args=(instructions, [m,n,1,9]))
        tasks.append(t)
        t.start()

    for n in range(1,10):
        t = Thread(target=runBase, args=(instructions, [m,n,1,9]))
        tasks.append(t)
        t.start()

    for n in range(1,10):
        t = Thread(target=runBase, args=(instructions, [m,n,1,9]))
        tasks.append(t)
        t.start()

    for n in range(1,10):
        t = Thread(target=runBase, args=(instructions, [m,n,1,9]))
        tasks.append(t)
        t.start()

for t in tasks:
    t.join()

print("Day 24")
print("  Part 2:", results)
