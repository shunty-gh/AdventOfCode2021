import os
from functools import reduce

def binArrayToInt(bin):
    return sum([1 << i if b == 1 else 0 for i,b in enumerate(bin[::-1])])

def sumVersions(packet):
    return packet['ver'] + sum(sumVersions(sub) for sub in packet['sub'])

def packetValue(packet):
    tid = packet['tid']
    if tid == 4:
        return packet['val']
    elif tid == 0:
        return sum(packetValue(sub) for sub in packet['sub'])
    elif tid == 1:
        return reduce(lambda a,b: a * b, [packetValue(sub) for sub in packet['sub']], 1)
    elif tid == 2:
        return min(packetValue(sub) for sub in packet['sub'])
    elif tid == 3:
        return max(packetValue(sub) for sub in packet['sub'])
    elif tid == 5:
        return 1 if packetValue(packet['sub'][0]) > packetValue(packet['sub'][1]) else 0
    elif tid == 6:
        return 1 if packetValue(packet['sub'][0]) < packetValue(packet['sub'][1]) else 0
    elif tid == 7:
        return 1 if packetValue(packet['sub'][0]) == packetValue(packet['sub'][1]) else 0
    else:
        raise Exception("Unkown type ID ", tid)

def fetchNextPacket(bits, start):
    packet = []
    pp = start
    ver = binArrayToInt(bits[pp:pp + 3])
    pp += 3
    tid = binArrayToInt(bits[pp:pp + 3])
    pp += 3
    packet = { 'ver': ver, 'tid': tid, 'ltid': -1, 'val': 0, 'sub': [] }
    if tid == 4:
        # read literal. read 5 bit chunks until first bit of chunk is 0
        lit = []
        lastchunk = False
        while not lastchunk:
            lastchunk = True if bits[pp] == 0 else False
            lit.extend(bits[pp+1:pp+5]) # append 4 bits out of the next 5
            pp += 5
        packet["val"] = binArrayToInt(lit)
    else:
        # read operator / subpackets
        ltid = bits[pp]
        pp += 1
        packet['ltid'] = ltid
        if ltid == 0:
            totlen = binArrayToInt(bits[pp:pp+15]) # 15 bits for total length, in bits, of subpackets
            pp += 15
            tl = pp + totlen
            while pp < tl:
                pp, pk = fetchNextPacket(bits, pp)
                packet['sub'].append(pk)
        else:
            numsubp = binArrayToInt(bits[pp:pp+11]) # 11 bits for num subpackets immediately contained by this packet
            pp += 11
            for _ in range(numsubp):
                pp, pk = fetchNextPacket(bits, pp)
                packet['sub'].append(pk)

    return (pp, packet)

## main

with open(os.path.dirname(os.path.realpath(__file__)) + "/../input/day16-input", "r") as f:
    input = f.readline().strip()
#input = "8A004A801A8002F478"  # expect P1: 16
#input = "620080001611562C8802118E34"  # expect P1: 12
#input = "C0015000016115A2E0802F182340"  # expect P1: 23
#input = "A0016C880162017C3686B18A3D4780" # expect P1: 31

bitmap = {
    '0': [0,0,0,0], '1': [0,0,0,1], '2': [0,0,1,0], '3': [0,0,1,1],
    '4': [0,1,0,0], '5': [0,1,0,1], '6': [0,1,1,0], '7': [0,1,1,1],
    '8': [1,0,0,0], '9': [1,0,0,1], 'A': [1,0,1,0], 'B': [1,0,1,1],
    'C': [1,1,0,0], 'D': [1,1,0,1], 'E': [1,1,1,0], 'F': [1,1,1,1],
}

bin = []
for ch in input:
    bin.extend(bitmap[ch])

_, packet = fetchNextPacket(bin, 0)
print("Day 16")
print("  Part 1", sumVersions(packet))
print("  Part 2", packetValue(packet))
