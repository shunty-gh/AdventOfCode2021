import { DayBase } from './day-runner.js';

interface Packet {
    version: number;
    typeID: number;
    value?: number;
    packets: Packet[];
}

type Bit = (0|1);

export class Day16 extends DayBase {
    constructor() {
        super(16);
    }

    private binmap: { [id: string] : Bit[] } = {
        '0': [0,0,0,0], '1': [0,0,0,1], '2': [0,0,1,0], '3': [0,0,1,1],
        '4': [0,1,0,0], '5': [0,1,0,1], '6': [0,1,1,0], '7': [0,1,1,1],
        '8': [1,0,0,0], '9': [1,0,0,1], 'A': [1,0,1,0], 'B': [1,0,1,1],
        'C': [1,1,0,0], 'D': [1,1,0,1], 'E': [1,1,1,0], 'F': [1,1,1,1],
    }

    public async run(): Promise<void> {
        const line = (await this.getInputLines())[0];
        //const line = "A0016C880162017C3686B18A3D4780"; // expect P1: 31, P2: 54
        const bin: Bit[] = [];
        for (let ch of line) {
            bin.push(...this.binmap[ch]);
        }

        let [_, pk] = this.parsePacket(bin, 0);
        console.info(`Day ${this.day}`);
        console.info('  Part 1:', this.versionSum(pk));
        console.info('  Part 2:', this.packetValue(pk));
    }

    private versionSum(packet: Packet): number {
        let result = packet.version;
        for (let sub of packet.packets) {
            result += this.versionSum(sub);
        }
        return result;
    }

    private packetValue(packet: Packet): number {
        const tid = packet.typeID;
        let result = 0;
        switch (tid) {
            case 0:
                for (let pk of packet.packets) {
                    result += this.packetValue(pk);
                }
                return result;
            case 1:
                result = 1;
                for (let pk of packet.packets) {
                    result *= this.packetValue(pk);
                }
                return result;
            case 2:
                result = Number.MAX_VALUE;
                for (let pk of packet.packets) {
                    let pv = this.packetValue(pk);
                    if (pv < result) {
                        result = pv;
                    }
                }
                return result;
            case 3:
                result = 0;
                for (let pk of packet.packets) {
                    let pv = this.packetValue(pk);
                    if (pv > result) {
                        result = pv;
                    }
                }
                return result;
            case 4:
                return packet.value ?? 0;
            case 5:
                return this.packetValue(packet.packets[0]) > this.packetValue(packet.packets[1]) ? 1 : 0;
            case 6:
                return this.packetValue(packet.packets[0]) < this.packetValue(packet.packets[1]) ? 1 : 0;
            case 7:
                return this.packetValue(packet.packets[0]) == this.packetValue(packet.packets[1]) ? 1 : 0;
            default:
                throw new Error(`Undefined typeID ${tid}`);
        }
    }

    private bitsToNum(bits: Bit[]): number {
        const str = bits.join("");
        return parseInt(str, 2);

        // Could use:
        // let result = 0;
        // for (let bit of bits) {
        //     result = (result * 2) + bit;
        // }
        // return result;
        // but !!NB!! Can't use bit shift operator << because
        // in JavaScript these use signed 32 bit numbers
        // and the values in this puzzle go beyond 32 bit occasionally
        // and, hence, this returns -ve numbers sometimes.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#bitwise_operators
    }

    private parsePacket(bin: Bit[], start: number): [number, Packet] {
        let result: Packet = { version: 0, typeID: 0, packets: [] };
        let index = start;
        result.version = this.bitsToNum(bin.slice(index, index+3));
        result.typeID = this.bitsToNum(bin.slice(index+3, index+6));
        index += 6;

        if (result.typeID == 4) {
            // literal, read in 5 bit chunks
            let lit = bin.slice(index+1, index+5);
            let islast = bin[index] == 0;
            index += 5;
            while (!islast) {
                islast = bin[index] == 0;
                lit.push(...bin.slice(index+1, index+5));
                index += 5;
            }
            result.value = this.bitsToNum(lit);
        } else {
            // operator with subpackets
            let lt = bin[index];
            let pk: Packet;
            index++;
            if (lt == 0) {
                let plen = this.bitsToNum(bin.slice(index, index+15));
                index += 15;
                let subindex = index + plen;
                while (index < subindex) {
                    [index, pk] = this.parsePacket(bin, index);
                    result.packets.push(pk);
                }
            } else {
                let numsubs = this.bitsToNum(bin.slice(index, index+11));
                index += 11;
                for (let x = 0; x < numsubs; x++) {
                    [index, pk] = this.parsePacket(bin, index);
                    result.packets.push(pk);
                }
            }
        }

        return [index, result];
    }
}
