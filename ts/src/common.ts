import { readFile } from 'fs/promises';

export interface Point2D {
    x: number;
    y: number;
}

export interface Point3D extends Point2D {
    z: number;
}

export function newPoint(x?: number, y?: number): Point2D {
    return { x: (x || 0), y: y || 0 };
}

export function newPoint3D(x?: number, y?: number, z?: number): Point3D {
    return { x: (x || 0), y: y || 0, z: z || 0 };
}

/** Rotate an (x,y) point 90 degrees anti-clockwise around a given point, or the
 *  origin if not specified, assuming y axis points UP as in normal geometry.
 *  For computers/graphics type grids where y axis points down then this is a
 *  clockwise rotation.
 * */
export function rotatePoint90(p: Point2D, o: Point2D = { x: 0, y: 0 }): Point2D {
    return {
        x: o.x - (p.y - o.y),
        y: o.y + (p.x - o.x)
    };
}

/** Rotate an (x,y) point 180 degrees around a given point or the origin (0,0)
 * if not specified.
 */
export function rotatePoint180(p: Point2D, o: Point2D = { x: 0, y: 0 }): Point2D {
    return {
        x: o.x - (p.x - o.x),
        y: o.y - (p.y - o.y)
    };
}

export async function getInputLines(day?: number, test: boolean = false): Promise<string[]> {
    try {
        const inputfile = test
            ? getInputFilename(day) + '-test'
            : getInputFilename(day);
        //console.log("Reading file " + inputfile + "...");
        const data = await readFile(inputfile, 'utf-8')
            .catch (reason => {
                if ((reason.errno && reason.errno === -4058) || (reason.code && reason.code === 'ENOENT')) {
                    console.error(`Error reading input file. File '${inputfile}' does not exist.`);
                } else {
                    console.error(`Error reading input file '${inputfile}'.`, reason);
                }
            }) || "";
        //console.log("Input data", data);
        return data
            .replace(/\r\n/g,'\n') // normalize line endings
            .split('\n')           // split on newline
            .filter(v => v)        // remove blank lines
            ;
    } catch (err) {
        console.log("Error reading input file.", err);
    }
    return [];
}

export async function getInputFloats(day?: number, test: boolean = false): Promise<number[]> {
    const lines = await getInputLines(day, test);
    let result: number[] = [];
    lines.forEach(v => {
        let n = parseFloat(v);
        if (!isNaN(n)) {
            result.push(n);
        }
    });
    return result;
}

export async function getInputInts(day?: number, test: boolean = false): Promise<number[]> {
    const lines = await getInputLines(day, test);
    let result: number[] = [];
    lines.forEach(v => {
        let n = parseInt(v, 10);
        if (!isNaN(n)) {
            result.push(n);
        }
    });
    return result;
}

export function getInputFilename(day?: number): string {
    const dayno = (day && day.toString()) || process.argv[2] || '1';
    const daynoZ = ('00' + dayno).slice(1);
    return `../input/day${daynoZ}-input`;
}

export function reverseString(src: string): string {
    return src
        .split('')
        .reverse()
        .join('');
}

export function countOccurs(toFind: string, src: string): number {
    if (toFind && toFind.length === 1) {
        return countCharOccurs(toFind, src);
    }
    let result = 0,
        idx = src.indexOf(toFind);

    while (idx >= 0) {
        result++;
        idx = src.indexOf(toFind, idx + 1);
    }
    return result;
}

export function countCharOccurs(ch: string, src: string): number {
    if (!ch || ch.length !== 1 || !src) {
        return -1;
    }
    let result = 0;
    for (let i = 0; i < src.length; i++) { result += src[i] === ch ? 1 : 0; }
    return result;
}

