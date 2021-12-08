import { DayBase } from './day-runner.js';

// https://adventofcode.com/2021/day/8

// For an explanation of the logic used see the Python version
// https://github.com/shunty-gh/AdventOfCode2021/blob/main/py/day08.py

export class Day08 extends DayBase {
    constructor() {
        super(8);
    }

    public async run(): Promise<void> {
        const lines = await this.getInputLines();

        const part1 = lines.reduce<number>((prev, curr) => {
            let l = curr.split(' | ')[1].split(' ');
            return l.reduce<number>((p,c) => p += [2,3,4,7].includes(c.length) ? 1 : 0, prev);
        }, 0);

        // Part 2
        let part2 = 0;
        lines.forEach(line => {
            const lhs = line.trim().split(' | ')[0].trim().split(' ');
            lhs.sort((a,b) => a.length - b.length); // sort by item length

            const oldmap = { [lhs[0][0]]: [ 'c', 'f' ], [lhs[0][1]]: [ 'c', 'f' ] }; // first entry in lhs will have 2 chars and therefore map to 1 which is 'c','f'
            const newmap: { a: string[], b: string[], c: string[] } = { 'a': [], 'b': [], 'c': [ lhs[0][0], lhs[0][1] ], /* 'f': maps same as 'c'*/ };
            // 2nd item in lhs == 3 chars == 7 => a,c,f;   c & f have already been found so the only one not in the oldmap is 'a'
            for (let i = 0; i < 3; i++) {
                const k = lhs[1][i];
                if (!(k in oldmap)) {
                    oldmap[k] = ['a'];
                    newmap['a'].push(k);
                }
            }
            // 3rd item in lhs == 4 chars == 4 => b,c,d,f;   c & f already found, which leave b,d
            for (let i = 0; i < 4; i++) {
                const k = lhs[2][i];
                if (!(k in oldmap)) {
                    oldmap[k] = ['b', 'd'];
                    newmap['b'].push(k);
                }
            }

            // Deduce and build the output digits
            const rhs = line.trim().split(' | ')[1].trim().split(' ');
            let num = '';
            rhs.forEach(r => {
                const rlen = r.length;
                if (rlen === 2) {
                    num += '1';
                } else if (rlen === 3) {
                    num += '7';
                } else if (rlen === 4) {
                    num += '4';
                } else if (rlen === 7) {
                    num += '8';
                } else if (rlen === 5) {  // 2,3,5;  3 => (c && f),  5 => (b && d),  2 => (e && g)
                    if (r.includes(newmap['c'][0]) && r.includes(newmap['c'][1])) {
                        num += '3';
                    } else if (r.includes(newmap['b'][0]) && r.includes(newmap['b'][1])) {
                        num += '5';
                    } else {
                        num += '2';
                    }
                } else {                  // 0,6,9;  6 => !(c && f);  0 => !(b && d)  9 => !(e && g)
                    if (!(r.includes(newmap['c'][0]) && r.includes(newmap['c'][1]))) {
                        num += '6';
                    } else if (!(r.includes(newmap['b'][0]) && r.includes(newmap['b'][1]))) {
                        num += '0';
                    } else {
                        num += '9';
                    }
                }
            });

            part2 += parseInt(num, 10);
        });

        console.info(`Day ${this.day}`);
        console.info(`  Part 1:`, part1);
        console.info(`  Part 2:`, part2);
    }
}
