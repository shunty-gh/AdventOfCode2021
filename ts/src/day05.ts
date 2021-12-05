import { DayBase } from './day-runner.js';

 // https://adventofcode.com/2021/day/5

export class Day05 extends DayBase {
    constructor() {
        super(5);
    }

    public async run(): Promise<void> {
        // input format: num,num -> num,num
        const input = await this.getInputLines();
        // const input = ['0,9 -> 5,9', '8,0 -> 0,8', '9,4 -> 3,4', '2,2 -> 2,1', '7,0 -> 7,4', '6,4 -> 2,0', '0,9 -> 2,9', '3,4 -> 1,4', '0,0 -> 8,8', '5,5 -> 8,2', ];

        const lines = input.map(ln => {
            const sp = ln.split(' -> ');
            const from = sp[0].trim().split(',');
            const to = sp[1].trim().split(',');
            return { from: [parseInt(from[0], 10), parseInt(from[1], 10)], to: [parseInt(to[0], 10), parseInt(to[1], 10)]};
        });

        console.info(`Day ${this.day}`);
        console.info(`  Part 1:`, this.getIntersections(lines, false));
        console.info(`  Part 2:`, this.getIntersections(lines, true));
    }

    private getIntersections(lines: { from: number[], to: number[]}[], includeDiagonals: boolean): number {
        const mapKey = (x: number, y: number): string => `${x}_${y}`;

        let map = new Map<string, number>();
        lines.forEach(line => {
            const xmin = Math.min(line.from[0], line.to[0]);
            const xmax = Math.max(line.from[0], line.to[0]);
            const ymin = Math.min(line.from[1], line.to[1]);
            const ymax = Math.max(line.from[1], line.to[1]);
            if (xmin === xmax || ymin === ymax) {
                // Horiz and vert lines
                for (let x = xmin; x <= xmax; x++) {
                    for (let y = ymin; y <= ymax; y++) {
                        map.set(mapKey(x,y), (map.get(mapKey(x,y)) || 0) + 1);
                    }
                }
            } else if (includeDiagonals) {
                // Start from the point with the smaller x
                // Then decide if y should increase or decrease
                let pfrom = line.from[0] === xmin ? line.from : line.to;
                let pto = line.from[0] === xmin ? line.to : line.from;
                let dy = pfrom[1] < pto[1] ? 1 : -1;

                let range = xmax - xmin; // 45 degree diagonal => xrange == yrange
                for (let x = 0; x <= range; x++) {
                    let key = mapKey(pfrom[0] + x, pfrom[1] + (dy * x));
                    map.set(key, (map.get(key) || 0) + 1);
                }
            }
        });

        let result = 0;
        map.forEach(m => result += m > 1 ? 1 : 0); // sum points with > 1 line passing through
        return result;
    }
}
