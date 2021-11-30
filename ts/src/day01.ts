import { DayBase } from './day-runner.js';

export class Day01 extends DayBase {
    constructor() {
        super(1);
    }

    public async run(): Promise<void> {
        const lines = await this.getInputInts();
        //console.log(`Day ${this.day} lines`, lines);
        let part1 = 0, part2 = 0;

        const target = 2020;
        const len = lines.length;
        for (let i = 0; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
                if (!part1) {
                    if (lines[i] + lines[j] === target) {
                        part1 = lines[i] * lines[j];
                    }
                }
                if (!part2) {
                    for (let k = j + 1; k < len; k++) {
                        if (lines[i] + lines[j] + lines[k] === target) {
                            part2 = lines[i] * lines[j] * lines[k];
                            break;
                        }
                    }
                }
            }
            if (part1 && part2) break;
        }

        console.info(`Day ${this.day}`);
        console.info(`  Part 1:`, part1);
        console.info(`  Part 2:`, part2);
    }
}