import { DayBase } from './day-runner.js';

enum State {
    Resting = 0,
    Flashed = 1,
}

interface Octopus {
    power: number;
    state: State;
}

export class Day11 extends DayBase {
    constructor() {
        super(11);
    }

    public async run(): Promise<void> {
        const lines = await this.getInputLines();
        // const lines= [
        //     '5483143223',
        //     '2745854711',
        //     '5264556173',
        //     '6141336146',
        //     '6357385478',
        //     '4167524645',
        //     '2176841721',
        //     '6882881134',
        //     '4846848554',
        //     '5283751526',
        // ];

        let creatures: Octopus[][] = [];
        lines.forEach((line) => {
            let row: Octopus[] = [];
            for (let i = 0; i < line.length; i++) {
                let oc: Octopus = {
                    power: parseInt(line[i], 10),
                    state: State.Resting,
                };
                row.push(oc);
            }
            creatures.push(row);
        });

        let part1 = 0, part2 = 0;
        let rounds = 0, flashes= 0;
        while (part1 === 0 || part2 === 0) {
            rounds++;
            creatures.forEach(r => r.forEach(c => c.power += 1 ));

            let flasher = true;
            while (flasher) {
                flasher = false;
                for (let y = 0; y < creatures.length; y++) {
                    for (let x = 0; x < creatures[0].length; x++) {

                        let oc = creatures[y][x];
                        if (oc.power > 9 && oc.state == State.Resting) {
                            oc.state = State.Flashed;
                            flashes++;
                            flasher = true;
                            let neigh = this.getNeighbours(creatures, x, y);
                            neigh.forEach(n => {
                                n.power += 1;
                            });
                        }
                    }
                }
            }

            let allFlashed = true;
            creatures.forEach(r => r.forEach(c => {
                if (c.power > 9) {
                    c.power = 0;
                    c.state = State.Resting;
                }
                if (c.power != 0) { // if all in sync then they'll all be at 0 after a group flash :-)
                    allFlashed = false;
                }
            }));

            if (rounds == 100) {
                part1 = flashes;
            }
            if (allFlashed === true) {
                part2 = rounds;
            }
        }

        console.info(`Day ${this.day}`);
        console.info(`  Part 1:`, part1);
        console.info(`  Part 2:`, part2);
    }

    private getNeighbours(map: Octopus[][], x: number, y: number): Octopus[] {
        let result: Octopus[] = [];
        const www = map[0].length;
        const hhh = map.length;
        const delta = [[1,0], [1,1], [0,1], [-1,1], [-1,0], [-1,-1], [0,-1], [1,-1]];
        for (let [dx,dy] of delta) {
            if ((x+dx >= 0) && (x+dx < www) && (y+dy >= 0) && (y+dy < hhh)) {
                result.push(map[y+dy][x+dx]);
            }
        }
        return result;
    }
}