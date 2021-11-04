import { DayBase } from './day-runner';
import { countOccurs } from './common';

export class Day02 extends DayBase {
    constructor() {
        super(2);
    }

    public async run(): Promise<void> {
        const lines = await this.getInputLines();
        let part1 = 0, part2 = 0;

        // Split lines: 'n-n a: xyz'
        const re = /(?<min>\d+)-(?<max>\d+)\s(?<ch>[a-z]):\s(?<pwd>[a-z]+)/
        lines.forEach(ll => {
            let matches = ll.match(re);
            if (matches && matches.groups) {
                const min = parseInt(matches.groups['min'], 10);
                const max = parseInt(matches.groups['max'], 10);
                const ch = matches.groups['ch'];
                const pwd = matches.groups['pwd'];
                const occ = countOccurs(ch, pwd);

                // Part 1
                if (occ >= min && occ <= max) {
                    part1++;
                }

                // Part 2
                const plen = pwd.length;
                const m1 = (min > 0) && (min <= plen) ? pwd[min - 1] === ch : false;
                const m2 = (max > 0) && (max <= plen) ? pwd[max - 1] === ch : false;
                part2 += (m1 || m2) && (m1 !== m2) ? 1 : 0;
            }
        });

        console.info(`Day ${this.day}`);
        console.info(`  Part 1:`, part1);
        console.info(`  Part 2:`, part2);
    }
}