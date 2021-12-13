import { DayBase } from './day-runner.js';

// https://adventofcode.com/2021/day/9

export class Day09 extends DayBase {
    constructor() {
        super(9);
    }

    private getVal = (lines: string[], x: number, y: number): number => parseInt(lines[y][x], 10);

    public async run(): Promise<void> {
        const lines = await this.getInputLines();
        //const lines = ['2199943210', '3987894921', '9856789892', '8767896789', '9899965678'] // expect P1: 15; P2: 1134

        const ww = lines[0].length;
        const hh = lines.length;
        let part1 = 0;
        let basins: number[] = [];
        for (let y = 0; y < hh; y++) {
            for (let x = 0; x < ww; x++) {
                let neigh = this.getNeighbours(lines, x, y, ww, hh);
                let v = this.getVal(lines, x, y);
                let islowerthanall = true;
                for (let [nx, ny] of neigh) {
                    if (v >= this.getVal(lines, nx, ny)) {
                        islowerthanall = false;
                        break;
                    }
                }
                if (islowerthanall) {
                    part1 += (v + 1);
                    basins.push(this.getBasinSize(lines, x, y, ww, hh));
                }
            }
        }

        basins.sort((a,b) => +b - +a);

        console.info(`Day ${this.day}`);
        console.info(`  Part 1:`, part1);
        console.info(`  Part 2:`, basins[0] * basins[1] * basins[2]);
        console.info('');
    }

    private getNeighbours(lines: string[], x: number, y: number, ww: number, hh: number): number[][] {
        let result: number[][] = [];
        const neighbours = [[1,0], [0,1], [-1,0], [0,-1]];
        for (var [dx,dy] of neighbours) {
            if (x+dx >= 0 && x+dx < ww && y+dy >= 0 && y+dy < hh) {
                result.push([x+dx, y+dy]);
            }
        }
        return result;
    }

    private getBasinSize(lines: string[], x: number, y: number, ww: number, hh: number): number {
        const getKey = (x:number, y: number): string => `${x}-${y}`;
        let result = 0;
        let visited: string[] = [];
        let tovisit: number[][] = [];
        tovisit.push([x,y]);
        while (tovisit.length > 0) {
            let [px, py] = tovisit.pop() ?? [0,0];
            let pkey = getKey(px, py);
            if (visited.includes(pkey)) {
                continue;
            }
            result++;
            visited.push(pkey);

            let neigh = this.getNeighbours(lines, px, py, ww, hh);
            for (let [nx, ny] of neigh) {
                if (!visited.includes(getKey(nx, ny)) && this.getVal(lines, nx, ny) < 9) {
                    tovisit.push([nx, ny]);
                }
            }
        }
        return result;
    }
}