import { DayBase } from './day-runner.js';

const foldText = "fold along ";
const foldTextLen = foldText.length;

export class Day13 extends DayBase {
    constructor() {
        super(13);
    }

    public async run(): Promise<void> {
        const lines = await this.getInputLines();
        // const lines = [
        //     '6,10', '0,14', '9,10', '0,3', '10,4', '4,11', '6,0', '6,12',
        //     '4,1', '0,13', '10,12', '3,4', '3,0', '8,4', '1,10', '2,14', '8,10', '9,0',

        //     'fold along y=7', 'fold along x=5',
        // ];

        let dots: number[][] = []
        let folds: number[][] = [];
        lines.forEach(line => {
            if (line.startsWith("fold")) {
                const fold = line.substring(foldTextLen).trim().split('=');
                const v = parseInt(fold[1], 10);
                folds.push(fold[0] === 'x' ? [v, 0] : [0, v]);
            } else if (line) {
                const dot = line.trim().split(',');
                dots.push([parseInt(dot[0], 10), parseInt(dot[1], 10)]);
            }
        });

        const part1 = this.fold(dots, folds[0]).length;
        let part2: number[][] = [...dots];
        for (let fold of folds) {
            part2 = this.fold(part2, fold);
        }

        console.info(`Day ${this.day}`);
        console.info(`  Part 1:`, part1);
        console.info('  Part 2:');
        this.draw(part2);
        console.info('');
    }

    private fold(dots: number[][], fold: number[]): number[][] {
        let result: number[][] = [];
        const folded = (fv: number, v: number): number => v > fv ? fv - (v - fv) : v;
        dots.forEach(dot => {
            let d: number[];
            if (fold[0] === 0) { // fold along y=?. x stays the same
                d = [dot[0], folded(fold[1], dot[1])];
            } else {             // fold along x=?. y stays the same
                d = [folded(fold[0], dot[0]), dot[1]];
            }
            if (!this.includes(result, d)) {
                result.push(d);
            }
        })
        return result;
    }

    private includes(dots: number[][], dot: number[]): boolean {
        for (let d of dots) {
            if (d[0] == dot[0] && d[1] == dot[1]) {
                return true;
            }
        }
        return false;
    }

    private draw(dots: number[][]) {
        let minx = 1000000, maxx = 0, miny = 1000000, maxy = 0;
        for (let dot of dots) {
            minx = dot[0] < minx ? dot[0] : minx;
            maxx = dot[0] > maxx ? dot[0] : maxx;
            miny = dot[1] < miny ? dot[1] : miny;
            maxy = dot[1] > maxy ? dot[1] : maxy;
        }
        //console.info(`X: ${minx}-${maxx}; Y: ${miny}-${maxy}`);

        for (let y = miny; y <= maxy; y++) {
            let line = '';
            for (let x = minx; x <= maxx; x++) {
                line += this.includes(dots, [x,y]) ? '#' : ' ';
            }
            console.info('    ' + line);
        }
    }
}