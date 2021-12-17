import { DayBase } from './day-runner.js';

// https://adventofcode.com/2021/day/17
// See the Python version for a bit more explanation of the logic of
// the upper and lower bounds used

export class Day17 extends DayBase {
    constructor() {
        super(17);
    }

    public async run(): Promise<void> {
        const line = (await this.getInputLines())[0];
        //const line = "target area: x=20..30, y=-10..-5"  // expect P1: 45,  P2: 112
        const [x,y] = line.substring("target area: ".length).split(', ')

        const tx0 = parseInt(x.slice(2).split('..')[0], 10);
        const tx1 = parseInt(x.slice(2).split('..')[1], 10);
        const ty0 = parseInt(y.slice(2).split('..')[0], 10);
        const ty1 = parseInt(y.slice(2).split('..')[1], 10);

        const vxMin = Math.trunc(Math.sqrt(tx0 * 2)) - 1; // or 0 works too. Technically vx could be -ve but that would never reach the target.
        const stepMax = (Math.abs(ty0) * 2) + 1;
        let highY = 0; // for part 1
        let pairs = new Set(); // for part 2
        for (let vx = vxMin; vx <= tx1; vx++) {
            for (let vy = ty0; vy <= -ty0; vy++) {
                let x = 0, y = 0;
                let xinc = vx, yinc = vy;
                for (var step = 1; step <= stepMax; step++) {
                    x += xinc;
                    y += yinc;
                    if (x >= tx0 && x <= tx1 && y >= ty0 && y <= ty1) {
                        if (vy > highY) {
                            highY = vy;
                        }
                        pairs.add(`${vx}_${vy}`);
                        //console.log("Hit!", step, vx, vy);
                    }
                    if (xinc > 0) {
                        xinc -= 1;
                    }
                    yinc--;
                }
            }
        }

        console.info(`Day ${this.day}`);
        console.info('  Part 1:', (highY * (highY + 1)) / 2);
        console.info('  Part 2:', pairs.size);
        console.info('');
    }
}