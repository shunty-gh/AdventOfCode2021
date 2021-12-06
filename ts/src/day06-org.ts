import internal from 'stream';
import { DayBase } from './day-runner.js';

// https://adventofcode.com/2021/day/6

export class Day06 extends DayBase {
    constructor() {
        super(6);
    }

    public async run(): Promise<void> {
        const input = (await this.getInputLines())[0];
        //const input = '3,4,3,1,2'; // expect P1: 5934 & P2: 26984457539

        let states: number[] = [];
        let freqs: number[] = [0,0,0,0,0,0,0]; // frequencies of 0..6 values in input
        input.split(',').forEach(i => {
            let result = parseInt(i, 10);
            states.push(result);
            freqs[result] += 1;
        });

        // Final outcome for any single initial start value is independent of other
        // initial values. Therefore we can work out the final values for start
        // values of 0..8 (to allow for the newly spawned items) and sum them as many
        // times as they appear in the set of initial values.

        // Trying to run the loop for 256 days blows up at about 210 or so but
        // we can get the final values/lists for 128 days and then use them
        // as initial values for a further 128 days - summing the lengths of the
        // (already calculated) individual elements.
        // That's not a very clear explanation and it could probably be done in
        // better ways but it's quick enough and it works.

        // Calculate individual sums/states for individual start values
        // of 0..8 for 80 & 128 days
        const days = 128;
        const mod = 7;
        let states80: number[] = [];
        let states128: number[][] = [];

        for (var startValue = 0; startValue <= 8; startValue++) {
            let dayStates: number[] = [startValue];
            let toAdd = startValue === 0 ? 1 : 0;

            for (let day = 1; day <= days; day++) {
                let ilen = dayStates.length;
                for (let a = 0; a < toAdd; a++) {
                    dayStates.push(mod + 1);
                }

                toAdd = 0;
                for (let i = 0; i < ilen; i++) {
                    if (dayStates[i] >= mod) { // new items start at 8
                        dayStates[i] = dayStates[i] - 1;
                    } else {
                        // NB JavaScript treats -1 % 7 as -1 rather than 6 so need to add 7 before mod
                        dayStates[i] = (mod + dayStates[i] - 1) % mod;
                    }
                    if (dayStates[i] == 0) {
                        toAdd++;
                    }
                }

                if (day == 80) { // final states for part 1
                    states80.push(dayStates.length);
                }
            }
            states128.push(dayStates);
        }

        let part1 = 0;
        for (let i = 0; i < freqs.length; i++) {
            part1 += freqs[i] * states80[i];
        }

        let part2 = 0;
        for (let i = 0; i < freqs.length; i++) {
            if (freqs[i] > 0) {
                let ds = states128[i];
                // sum the 128 day totals for each element in ds
                let sum256 = 0;
                ds.forEach(d => {
                    sum256 += states128[d].length;
                });
                part2 += (freqs[i] * sum256);
            }
        }

        console.info(`Day ${this.day}`);
        console.info(`  Part 1:`, part1);
        console.info(`  Part 2:`, part2);
        console.info('');
    }
}
