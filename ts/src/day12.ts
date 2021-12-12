import { DayBase } from './day-runner.js';

interface Node {
    name: string;
    connections: Node[];
    caps: boolean;
}

export class Day12 extends DayBase {
    constructor() {
        super(12);
    }

    public async run(): Promise<void> {
        const lines = await this.getInputLines();
        const newNode = (nodeName: string): Node => ({ name: nodeName, connections: [], caps: nodeName[0] >= 'A' && nodeName[0] <= 'Z' });

        let nodes = new Map<string, Node>();
        lines.forEach(line => {
            const [left, right] = line.trim().split('-');
            let ln = nodes.get(left) || newNode(left);
            let rn = nodes.get(right) || newNode(right);
            ln.connections.push(rn);
            rn.connections.push(ln);
            if (!nodes.has(left)) {
                nodes.set(left, ln);
            }
            if (!nodes.has(right)) {
                nodes.set(right, rn);
            }
        });

        console.info(`Day ${this.day}`);
        console.info(`  Part 1:`, this.findPaths(nodes, 1));
        console.info(`  Part 2:`, this.findPaths(nodes, 2));
        console.info('');
    }

    private findPaths(nodes: Map<string, Node>, partNo: number): number {
        let finalPaths: string[][] = [];
        let q: string[][]  = [["0", "start"]]; // '0' first element signifies if we have a double appearance of a lowercase node in there. 0 => no; 1 => yes
        while (q.length > 0) {
            let path = q.shift() ?? [];
            //  get the last node in the path, add each possible connection to the path
            let last = nodes.get(path[path.length - 1]);
            if (last === undefined) {
                throw new Error(`Cannot find node with name ${path[-1]}`);
            }
            last.connections.forEach(c => {
                // is it lower case and have we visited before
                if (!c.caps && path.includes(c.name)) {
                    if (partNo === 2 && path[0] === "0" && c.name != "start") { // Does it already include any lowercase cave twice
                        let newpath = [...path, c.name];
                        newpath[0] = "1";
                        q.push(newpath);
                    } // else can't go here
                } else if (c.name === "end")  {
                    finalPaths.push([...path, "end"]);
                } else {
                    q.push([...path, c.name]);
                }
            });
        }
        return finalPaths.length;
    }
}