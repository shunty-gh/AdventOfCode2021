import os

# https://adventofcode.com/2021/day/4

def isWinner(board):
    nums = board['n']
    for i in range(5):
        j = i * 5
        cwin = nums[i][1] and nums[i+5][1] and nums[i+10][1] and nums[i+15][1] and nums[i+20][1]
        rwin = nums[j][1] and nums[j+1][1] and nums[j+2][1] and nums[j+3][1] and nums[j+4][1]
        if rwin or cwin:
            return True
    return False

def sumUnmarked(board):
    return sum([el[0] for el in board['n'] if el[1] == False])

def play(draws, boards):
    first, last = 0, 0
    for draw in draws:
        for board in boards:
            if board['w']:
                continue
            for el in board['n']:
                if el[0] == draw:
                    el[1] = True
                    # check if winner
                    if isWinner(board):
                        board['w'] = True
                        if first == 0:
                            first = draw * sumUnmarked(board)
                        last = draw * sumUnmarked(board)
                    break
    return first, last


with open("../input/day04-input", "r") as f:
    input = [line.strip() for line in f.readlines()]
draws = [int(x) for x in input[0].split(',')]
boards = []
board = { 'w': False, 'n': [] }
for line in input[2:]:
    if line == '':
        boards.append(board)
        board = { 'w': False, 'n': [] }
        nums = []
        continue
    board['n'].extend([[int(x), False] for x in line.replace('  ', ' ').split(' ')])
boards.append(board)

part1, part2 = play(draws, boards)

print("Day 19")
print("  Part 1:", part1)
print("  Part 2:", part2)
