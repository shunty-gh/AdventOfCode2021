import { DayBase } from './day-runner.js';

export class Day15 extends DayBase {
    constructor() {
        super(15);
    }


    public async run(): Promise<void> {
        const lines = await this.getInputLines();

        const map: number[][] = [];
        lines.forEach(line => {
            let row: number[] = [];
            for( let ch of line) {
                row.push(parseInt(ch, 10));
            }
            map.push(row);
        });

        console.info(`Day ${this.day}`);
        const part1 = this.findShortestPath(map);
        console.info('  Part 1:', part1);

        const map2 = this.expandMap(map, 5);
        const part2 = this.findShortestPath(map2);
        console.info('  Part 2:', part2);
        console.info('');
    }


    // Basic version of Dijkstra's algorithm
    // Not particularly optimal 'cos we're using a plain array and array.shift()
    // rather than a priority queue. But it works well enough for this use case.
    private findShortestPath(map: number[][]): number {
        const mapKey = (x: number, y: number): string => `${x}_${y}`;
        const costs = new Map<string, number>();
        const mlen = map.length;
        const target = mlen - 1;

        // Initialise all cell 'costs' to a very large number
        for (let y = 0; y < mlen; y++) {
            for (let x = 0; x < mlen; x++) {
                costs.set(mapKey(x,y), Number.MAX_VALUE);
            }
        }
        // and set the start cell cost to 0
        costs.set(mapKey(0,0), 0);

        // shortest is just the value at costs[(target, target)] but is easier to get/compare
        let shortest = costs.get(mapKey(target, target)) ?? Number.MAX_VALUE;

        //const start = performance.now();
        let queue: number[][] = [[0,0,0]];
        while (queue.length > 0) {
            const [c,x,y] = queue.shift() ?? [0,0,0];
            if ((c >= shortest) || (c > (costs.get(mapKey(x,y)) ?? Number.MAX_VALUE))) {
                continue;
            }

            for (let [nx, ny] of this.getNeighbours(x, y, mlen, mlen)) {
                let cost = c + map[ny][nx];
                if (cost > shortest) {
                    continue;
                }

                const nkey = mapKey(nx, ny);
                if (cost < (costs.get(nkey) ?? Number.MAX_VALUE)) {
                    costs.set(nkey, cost);
                    if (nx == target && ny == target) {
                        shortest = cost;
                    } else {
                        // By adding this 'very dumb' priority check rather than just using a
                        // straight queue.push() each time, the runtime reduces a surprising
                        // amount (~1.8s vs 2.8s) for part 2
                        if (queue.length > 0 && cost < queue[0][0]) {
                            queue.unshift([cost, nx, ny]);
                        } else {
                            queue.push([cost, nx, ny]);
                        }
                    }
                }
            }
            // Sorting the queue would provide a pseudo-priority queue but it takes longer
            // than not bothering
            //queue.sort((a,b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
        }
        //const end = performance.now();
        //console.log(`Run time: ${end - start}ms`);
        return shortest;  // === costs[(target, target)]
    }

    private getNeighbours(x: number, y: number, maxx: number, maxy: number): number[][] {
        const deltas = [[1,0], [0,-1], [-1,0], [0,1]];
        let result: number[][] = [];
        for (let [dx,dy] of deltas) {
            if (x+dx >= 0 && x+dx < maxx && y+dy >= 0 && y+dy < maxy) {
                result.push([x+dx, y+dy]);
            }
        }
        return result;
    }

    private expandMap(map: number[][], times: number): number[][] {
        const mlen = map[0].length;
        let result: number[][]= [];
        // expand each row to the new width
        for (let y = 0; y < map.length; y++) {
            let newrow = [...map[y]];
            for (let exp = 0; exp < times - 1; exp++) {
                let nextchunk = newrow.slice(-mlen);
                for (let x = 0; x < mlen; x++) {
                    nextchunk[x] = Math.max(1, (nextchunk[x] + 1) % 10);
                }
                newrow.push(...nextchunk);
            }
            result.push(newrow);
        }

        // add the new rows
        for (let exp = 0; exp < times - 1; exp++) {
            for (let y = 0; y < mlen; y++) {
                let newrow = [...result[result.length - mlen]];
                for (let x = 0; x < newrow.length; x++) {
                    newrow[x] = Math.max(1, (newrow[x] + 1) % 10);
                }
                result.push(newrow);
            }
        }

        return result;
    }
}