import { DayBase } from './day-runner.js';

export class DayXX extends DayBase {
    constructor() {
        super(0); // CHANGE THIS DAY NUMBER
    }

    public async run(): Promise<void> {
        const lines = await this.getInputLines();
        console.log(`Day ${this.day} lines`, lines);
        let part1 = 0, part2 = 0;

        // Do something...

        console.info(`Day ${this.day}`);
        console.info(`  Part 1:`, part1);
        console.info(`  Part 2:`, part2);
    }
}