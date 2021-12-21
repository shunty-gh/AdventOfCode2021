import os

# https://adventofcode.com/2021/day/18

# I hate snailfish. They can stick their addition where the sun doesn't shine.

# This is not the greatest work of code. But it took so long to work out that I really
# can't be arsed to tidy it up. maybe one day in the future...

def add(sn1: str, sn2: str) -> str:
    snr = '[{},{}]'.format(sn1, sn2)
    # reduce it
    return reduce(snr)

def reduce(sn):
    sn1, reduced = doReduce(sn)
    # so much easier to comprehend than recursion
    while reduced:
        sn1, reduced = doReduce(sn1)
    return sn1

def doReduce(sn: str):
    out = []
    i = 0
    lvl = 0
    lastnumindex = -1
    reduced = False
    slen = len(sn)
    while i < slen:
        ch = sn[i]
        if ch == '[':
            lvl += 1
            out.append(ch)
            i += 1
        elif ch == ']':
            lvl -= 1
            out.append(ch)
            i += 1
        elif ch == ',':
            out.append(ch)
            i += 1
        elif ch == ' ':
            i += 1
        else: # number
            j = i
            while sn[j].isdigit():
                j += 1
            n1 = int(sn[i:j])

            # test if we need to explode
            if lvl > 4 and sn[j] == ',' and sn[j+1].isdigit():
                # read next num, skip ',' first
                j += 1
                k = j
                while sn[k].isdigit():
                    k += 1
                n2 = int(sn[j:k])
                # add to prev num, if any
                if lastnumindex >= 0:
                    out[lastnumindex] = str(int(out[lastnumindex]) + n1)
                # replace last '[' on the output array with '0'
                out[-1] = '0'
                # find next number, if any, and add to it. skip closing ']' first
                k += 1
                while k < slen and not sn[k].isdigit():
                    out.append(sn[k])
                    k += 1
                if k < slen:
                    j = k
                    while sn[k].isdigit():
                        k += 1
                    n3 = int(sn[j:k])
                    out.append(str(n2 + n3))
                # add rest of source string
                out.append(sn[k:])
                reduced = True
                i = slen
            else:
                lastnumindex = len(out)
                out.append(str(n1))
                i = j

    if not reduced: # do we need to split it?
        r, reduced = doSplit(sn)
    else:
        r = ''.join(out)
    #print(r)
    return r, reduced

def doSplit(sn: str):
    out = []
    i = 0
    reduced = False
    slen = len(sn)
    while i < slen:
        ch = sn[i]
        if ch in ['[', ']', ',']:
            out.append(ch)
            i += 1
        elif ch == ' ':
            i += 1
        else: # number
            j = i
            while j < slen and sn[j].isdigit():
                j += 1
            n1 = int(sn[i:j])

            # test if we need to split
            if n1 >= 10:
                reduced = True
                lv = n1 // 2
                rv = n1 - lv
                out.append('[')
                out.append(str(lv))
                out.append(',')
                out.append(str(rv))
                out.append(']')
                # append rest of source
                out.append(sn[j:])
                break
            else:
                out.append(str(n1))

            i = j

    return ''.join(out), reduced

def parse(snstr):
    # split out the left and right parts into a tree of items
    # to make the magnitude calculations easier
    current = None
    stack = []
    for ch in snstr:
        if ch == '[':
            # start a new item
            #next = { 'lv': -1, 'rv': -1, 'up': current, 'l': None, 'r': None }
            next = { 'lv': -1, 'rv': -1, 'l': None, 'r': None }
            if current is not None:
                if current['lv'] >= 0 or current['l'] is not None:
                    current['r'] = next
                else:
                    current['l'] = next
                stack.append(current)
            current = next
        elif ch == ']':
            if stack:
                current = stack.pop()
        elif ch == ',':
            pass
        else: # single digit number
            if current['lv'] >= 0 or current['l'] is not None:
                current['rv'] = int(ch)
            else:
                current['lv'] = int(ch)
    return current

def magnitude(sn: str) -> int:
    parsed = parse(sn)
    return _magnitude(parsed)

def _magnitude(sn):
    lm = 0
    if sn['lv'] >= 0:
        lm = sn['lv']
    else:
        lm = _magnitude(sn['l'])

    rm = 0
    if sn['rv'] >= 0:
        rm = sn['rv']
    else:
        rm = _magnitude(sn['r'])

    return (3 * lm) + (2 * rm)

## main

with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day18-input", "r") as f:
    input = [line.strip() for line in f.readlines()]

# input = [                                           # expect P1: 3488 from '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]'
#     '[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]',
#     '[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]',
#     '[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]',
#     '[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]',
#     '[7,[5,[[3,8],[1,4]]]]',
#     '[[2,[2,2]],[8,[8,1]]]',
#     '[2,9]',
#     '[1,[[[9,3],9],[[9,0],[0,7]]]]',
#     '[[[5,[7,4]],7],1]',
#     '[[[[4,2],2],6],[8,7]]',
# ]
# input = [                                          # expect P1: 4140; P2: 3993
#     '[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]',
#     '[[[5,[2,8]],4],[5,[[9,9],0]]]',
#     '[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]',
#     '[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]',
#     '[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]',
#     '[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]',
#     '[[[[5,4],[7,7]],8],[[8,3],8]]',
#     '[[9,3],[[9,9],[6,[4,9]]]]',
#     '[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]',
#     '[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]',
# ]

sn = input[0]
for i in range(1, len(input)):
    sn = add(sn, input[i])

print("Day 18")
print("  Part 1:", magnitude(sn))

# part 2
largest = 0
for l1 in input:
    for l2 in input:
        if l1 == l2:
            continue

        m = magnitude(add(l1, l2))
        if m > largest:
            largest = m

        # try the other way round
        m = magnitude(add(l2, l1))
        if m > largest:
            largest = m

print("  Part 2:", largest)
