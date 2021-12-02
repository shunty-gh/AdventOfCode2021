import { DayBase } from './day-runner.js';

export class Day02 extends DayBase {
    constructor() {
        super(2);
    }

    public async run(): Promise<void> {
        const lines = await this.getInputLines();

        let x1 = 0, y1 = 0, y2 = 0, a2 = 0;
        lines.forEach(l => {
            const parts = l.split(' ');
            const dir = parts[0];
            const v = parseInt(parts[1], 10);
            if (dir === 'forward') {
                x1 += v;
                y2 += (a2 * v);
            } else if (dir === 'down') {
                y1 += v;
                a2 += v;
            } else if (dir === 'up') {
                y1 -= v;
                a2 -= v;
            }
        });
        const part1 = x1 * y1;
        const part2 = x1 * y2;

        console.info(`Day ${this.day}`);
        console.info(`  Part 1:`, part1);
        console.info(`  Part 2:`, part2);
        console.info('');
    }
}