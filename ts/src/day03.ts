import { DayBase } from './day-runner.js';

export class Day03 extends DayBase {
    constructor() {
        super(3);
    }

    public async run(): Promise<void> {
        const lines = await this.getInputLines();
        // const lines = ['00100','11110','10110','10111','10101','01111','00111','11100','10000','11001','00010','01010',]; // expect P1: 198 & P2: 230
        const blen = lines[0].length;

        // 'counts' contains the relative number of 1 (+ve) vs 0 (-ve) bits
        // in each position. ie if counts[2] > 0 then there are more 1s in
        // index position 2.
        let counts = Array<number>(blen).fill(0);
        lines.forEach(line => {
            for (let i = 0; i < blen; i++) {
                counts[i] += line[i] === '1' ? 1 : -1;
            }
        });
        // Treat +ve as 1 and -ve as 0 and convert to int
        let mc = 0, lc = 0;
        for (let i = 0; i < blen; i++) {
            if (counts[i] > 0) {
                mc += (1 << (blen- i - 1));
            } else {
                lc += (1 << (blen - i - 1));
            }
        }

        // Part 2
        let mfilt: string[] = [...lines], lfilt: string[] = [...lines]; //([] as string[]).concat(lines); //Array.from(lines);
        let idx = 0;
        while (mfilt.length > 1) {
            mfilt = this.filterValues(mfilt, idx++, true);
        }
        idx = 0;
        while (lfilt.length > 1) {
            lfilt = this.filterValues(lfilt, idx++, false);
        }
        const ogr = this.binaryStrToInt(mfilt[0]);
        const csr = this.binaryStrToInt(lfilt[0]);

        //console.log('mcb, mc, lc', mcb, mc, lc);
        //console.log('mfilt, lfilt', mfilt, lfilt);
        console.info(`Day ${this.day}`);
        console.info(`  Part 1:`, lc * mc);
        console.info(`  Part 2:`, ogr * csr);
        console.info('');
    }

    private binaryStrToInt(input: string): number {
        if (!input) { return 0; }
        const slen = input.length;
        let result = 0;
        for (let i = 0; i < slen; i++) {
            if (input[i] === '1') {
                result += (1 << (slen - i - 1));
            }
        }
        return result;
    }

    private filterValues(lines: string[], index: number, requireMostCommon: boolean): string[] {
        if (lines.length === 1) {
            return lines;
        }

        let ones: string[] = [];
        let zeros: string[] = [];
        lines.forEach(v => {
            if (v[index] === '1') {
                ones.push(v);
            } else {
                zeros.push(v);
            }
        })
        return requireMostCommon
            ? ones.length >= zeros.length ? ones : zeros   // most common
            : ones.length >= zeros.length ? zeros : ones;  // least common
    }
}
