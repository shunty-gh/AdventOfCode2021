import { DayBase } from './day-runner.js';

export class Day12 extends DayBase {
    constructor() {
        super(12);
    }

    public async run(): Promise<void> {
        const lines = await this.getInputLines();
        const caves = new Map<string, string[]>();
        lines.forEach(line => {
            const [left, right] = line.trim().split('-');
            caves.set(left, (caves.get(left) || []).concat(right));
            caves.set(right, (caves.get(right) || []).concat(left));
        });

        console.info(`Day ${this.day}`);
        console.info(`  Part 1:`, this.findPaths(caves));
        console.info(`  Part 2:`, this.findPaths(caves, true));
        console.info('');
    }

    private findPaths(caves: Map<string, string[]>, allowSecondVisit: boolean = false): number {
        let paths = new Set<string>();
        let q = [{ 'key': 'start', 'path': 'start', 'dup': false}];
        while (q.length > 0) {
            let current = q.pop() || { 'key': '', 'path': '', 'dup': false}; // just to keep the TS compiler happy

            (caves.get(current.key) || []).forEach(c => {
                if (c === 'end') {
                    paths.add(current.path);
                } else if ((c[0] >= 'A' && c[0] <= 'Z') || (!current.path.includes(c))) {
                    q.push({ 'key': c, 'path': `${current.path}_${c}`, 'dup': current.dup });
                } else if (allowSecondVisit && c !== 'start' && !current.dup) {
                    q.push({ 'key': c, 'path': `${current.path}_${c}`, 'dup': true });
                }
            });
        }
        return paths.size;
    }
}