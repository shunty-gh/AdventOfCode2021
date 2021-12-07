import { linesToInts } from './common.js';
//import { lineToInts } from './common.js';
import { DayBase } from './day-runner.js';

export class Day07 extends DayBase {
    constructor() {
        super(7);
    }

    public async run(): Promise<void> {
        const starts = linesToInts(await this.getInputLines());
        //const starts = lineToInts('16,1,2,0,4,2,7,1,2,14');  // expect P1: 37; P2: 168
        starts.sort();
        const smin = starts[0];
        const smax = starts[starts.length - 1];

        let part1 = 0, part2 = 0;
        for (let pos = smin; pos <= smax; pos++) {
            let fuel = this.totalFuel(starts, pos, part1, 1);
            if (fuel > 0 && (part1 === 0 || fuel < part1)) {
                part1 = fuel;
            }

            fuel = this.totalFuel(starts, pos, part2, 2);
            if (fuel > 0 && (part2 === 0 || fuel < part2)) {
                part2 = fuel;
            }
        }
        console.info(`Day ${this.day}`);
        console.info(`  Part 1:`, part1);
        console.info(`  Part 2:`, part2);
    }

    private totalFuel(items: number[], pos: number, giveUpAfter: number, method: number): number {
        let result = 0;
        items.forEach(i => {
            if (method === 1) {
                result += Math.abs(i - pos);
            } else {
                let dist = Math.abs(i - pos);
                result += (dist * (dist + 1)) / 2;
            }
            if (giveUpAfter > 0 && result > giveUpAfter) {
                return 0;
            }
        });
        return result;
    }
}