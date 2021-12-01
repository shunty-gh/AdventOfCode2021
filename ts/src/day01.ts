import { DayBase } from './day-runner.js';

export class Day01 extends DayBase {
    constructor() {
        super(1);
    }

    public async run(): Promise<void> {
        const readings = await this.getInputInts();
        //const readings = [ 199,200,208,210,200,207,240,269,260,263];
        let part1 = 0, part2 = 0;

        for (let i = 1; i < readings.length; i++) {
            if (readings[i] > readings[i-1]) {
                part1++;
            }
        }

        let winA = readings[0] + readings[1] + readings[2];
        let winB = winA;
        for (let i = 2; i < readings.length - 1; i++) {
            winB = winB - readings[i-2] + readings[i+1];
            if (winB > winA) {
                part2++;
            }
            winA = winB;
        }

        // for (let i = 2; i < readings.length - 1; i++) {
        //     let wa = readings[i-2] + readings[i-1] + readings[i];
        //     let wb = readings[i-1] + readings[i] + readings[i+1];
        //     if (wb > wa) {
        //         part2++;
        //     }
        // }

        console.info(`Day ${this.day}`);
        console.info(`  Part 1:`, part1);
        console.info(`  Part 2:`, part2);
    }
}