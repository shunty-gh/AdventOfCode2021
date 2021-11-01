import os

with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day01-input", "r") as f:
    input = [int(line) for line in f.readlines()]

part1 = 0
part2 = 0

## Inefficient but it works, sort of, for this input
# for i in input:
#     for j in input:
#         if part2 == 0:
#             for k in input:
#                 if i + j + k == 2020:
#                     print("Part 2: ", i * j * k)
#                     break

#         if part1 == 0 and i + j == 2020:
#             print("Part 1: ", i*j)
#         if part1 > 0 and part2 > 0:
#             break
#     if part1 > 0 and part2 > 0:
#         break

# ilen = len(input)
# for i in range(ilen):
#     for j in range(i+1, ilen):
#         if part1 == 0 and  input[i] + input[j] == 2020:
#             part1 = input[i] * input[j]

#         if part2 == 0:
#             for k in range(j+1, ilen):
#                 if input[i] + input[j] + input[k] == 2020:
#                     part2 = input[i] * input[j] * input[k]
#                     break

#     if part1 > 0 and part2 > 0:
#         break

for ix, i in enumerate(input):
    for jx, j in enumerate(input[ix + 1:]):
        if i + j == 2020:
            part1 = i * j

        if part2 == 0:
            for kx, k in enumerate(input[jx + 1:]):
                if i + j + k == 2020:
                    part2 = i * j * k
                    break
        if part1 > 0 and part2 > 0:
            break
    if part1 > 0 and part2 > 0:
        break

print("Part 1:", part1)
print("Part 2:", part2)
