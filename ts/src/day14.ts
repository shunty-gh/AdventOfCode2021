import { DayBase } from './day-runner.js';

// https://adventofcode.com/2021/day/14
// See the C# and Python versions for comments

export class Day14 extends DayBase {
    constructor() {
        super(14);
    }

    public async run(): Promise<void> {
        const lines = await this.getInputLines();
        const start = lines[0];
        const inserts = new Map<string, string>();
        for (let i = 2; i < lines.length; i++) {
            let [key, val] = lines[i].split(' -> ');
            inserts.set(key, val);
        }
        console.info(`Day ${this.day}`);
        console.info(`  Part 1:`, this.doInsert(start, inserts, 10));
        console.info(`  Part 2:`, this.doInsert(start, inserts, 40));
    }

    private doInsert(start: string, inserts: Map<string, string>, steps: number): number {
        // split start into pairs
        let pairs = new Map<string, number>();
        for (let i = 0; i < start.length - 1; i++) {
            const k = start[i] + start[i+1];
            pairs.set(k, (pairs.get(k) || 0) + 1);
        }

        for (let step = 0; step < steps; step++) {
            // apply insertion, split into pairs, increment count
            let pairs2 = new Map<string, number>();
            pairs.forEach((v, k) => {
                const toInsert = inserts.get(k) || ' ';
                const k1 = k[0] + toInsert;
                const k2 = toInsert + k[1];
                pairs2.set(k1, (pairs2.get(k1) || 0) + v);
                pairs2.set(k2, (pairs2.get(k2) || 0) + v);
            });
            pairs = pairs2;
        }

        // group and sum
        const counts = new Map<string, number>();
        pairs.forEach((v,k) => {
            counts.set(k[0], (counts.get(k[0]) || 0) + v);
        });
        // don't forget to add the last character of the start string
        counts.set(start[start.length - 1], (counts.get(start[start.length - 1]) || 0) + 1);

        const max = Math.max(...counts.values());
        const min = Math.min(...counts.values());
        return max - min;
    }
}