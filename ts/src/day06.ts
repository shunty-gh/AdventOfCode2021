import { DayBase } from './day-runner.js';

// https://adventofcode.com/2021/day/6

export class Day06 extends DayBase {
    constructor() {
        super(6);
    }

    public async run(): Promise<void> {
        const input = (await this.getInputLines())[0];
        //const input = '3,4,3,1,2'; // expect P1: 5934 & P2: 26984457539

        let startStates = new Array(9).fill(0);
        input.split(',').forEach(i => {
            startStates[parseInt(i, 10)] += 1;
        });

        console.info(`Day ${this.day}`);
        console.info(`  Part 1:`, this.runDays(startStates, 80));
        console.info(`  Part 2:`, this.runDays(startStates, 256));
        console.info('');
    }

    private runDays(startStates: number[], dayCount: number): number {
        let currentState = [...startStates];
        for (let day = 0; day < dayCount; day++) {
            let nextState: number[] = new Array(startStates.length).fill(0);
            currentState.forEach((count, index) => {
                if (index === 0) {
                    // when we reach 0 we spawn a new element in the next iteration so inc both index 6 and 8
                    nextState[6] += count;
                    nextState[8] += count;
                } else { // otherwise inc index-1
                    nextState[index - 1] += count;
                }
            });
            currentState = nextState;
        }
        let result = 0;
        currentState.forEach(v => result += v);
        return result;
    }
}
