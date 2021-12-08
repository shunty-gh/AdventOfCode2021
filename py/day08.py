import os

# https://adventofcode.com/2021/day/8

with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day08-input", "r") as f:
    input = [split for split in [line.strip().split(' | ') for line in f.readlines()]]

## Sample input  # expect P1: 26; P2: 61229
# lines = [
#   'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe',
#   'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc',
#   'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg',
#   'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb',
#   'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea',
#   'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb',
#   'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe',
#   'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef',
#   'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb',
#   'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce'
# ]
# input = [split for split in [line.strip().split(' | ') for line in lines]]

part1 = 0 # count all results that contain strings of length 2,3,4,7
for outp in [i[1].strip().split(' ') for i in input]:
    part1 += sum(1 for op in outp if len(op) in [2,3,4,7])

"""
Segments:
 0: 6;  [a,b,c,e,f,g]
 1: 2;  [c,f]
 2: 5;  [a,c,d,e,g]
 3: 5;  [a,c,d,f,g]
 4: 4;  [b,c,d,f]
 5: 5;  [a,b,d,f,g]
 6: 6;  [a,b,d,e,f,g]
 7: 3;  [a,c,f]
 8: 7;  [a,b,c,d,e,f,g]
 9: 6;  [a,b,c,d,f,g]

in lhs
  find el of length 2 (ie 1, segments c,f)
    el[i] -> c|f

  find el of length 3 (ie 7, segments a,c,f)
    el[i] -> if already found then c|f else a

  find el of length 4 (ie 4, segments b,c,d,f)
    el[i] -> if already found then c|f else b|d

  find el of length 7 (ie 8, all segments)
    el[i] -> if already found then a|[c|f]|[b|d] else e|g

A quick sort() and print() of the input shows that each line has exactly
one entry each of 2, 3, 4 and 7 characters and 3 entries each of 5 and 6 characters.
Use this fact to easily get and analyse entries of length 2,3,4,7.
"""

part2 = 0
for line in input:
    lhs = line[0].strip().split(' ')
    lhs.sort(key=len)
    #print(lhs)

    # 1st item == 2 chars == 1 => c|f
    scrambled = { lhs[0][0]: ['c', 'f'], lhs[0][1]: ['c', 'f'] }
    correct = { 'a': [], 'b': [], 'c': [lhs[0][0], lhs[0][1]] }

    # 2nd item == 3 chars == 7 => a|c|f - we've already 'seen' c|f so the one we haven't yet seen must be a
    for i in range(3):
        if lhs[1][i] not in scrambled:
            scrambled[lhs[1][i]] = ['a']
            correct['a'].append(lhs[1][i])

    # 3rd item == 4 chars == 4 => b|c|d|f - already seen c|f so others must be b|d
    for i in range(4):
        if lhs[2][i] not in scrambled:
            scrambled[lhs[2][i]] = ['b', 'd']
            correct['b'].append(lhs[2][i])

    # 10th item == 7 chars == 8 - already seen a|b|c|d|f so others must be e|g
    # but we don't really care

    rhs = line[1].strip().split(' ')
    numstr = ''
    for r in rhs:
        lr = len(r)
        if lr == 2:
            numstr += '1'
        elif lr == 3:
            numstr += '7'
        elif lr == 4:
            numstr += '4'
        elif lr == 7:
            numstr += '8'
        elif lr == 5:     # '2','3','5' -> (c & f) = 3; (b & d) = 5; (e & g) = 2
            if correct['c'][0] in r and correct['c'][1] in r:
                numstr += '3'
            elif correct['b'][0] in r and correct['b'][1] in r:
                numstr += '5'
            else:
                numstr += '2'
        else:             # '0','6','9' -> !(c & f) = 6; !(b & d) = 0; !(e & g) = 9
            if not (correct['c'][0] in r and correct['c'][1] in r):
                numstr += '6'
            elif not (correct['b'][0] in r and correct['b'][1] in r):
                numstr += '0'
            else:
                numstr += '9'
    #print(numstr)
    part2 += int(numstr, 10)

print("Day 8")
print("  Part 1:", part1)
print("  Part 2:", part2)
