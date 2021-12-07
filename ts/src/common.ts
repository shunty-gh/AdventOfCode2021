import fs from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { env } from 'process';
import { fetch } from 'cross-fetch';

export async function fetchInput(day: number, year: number = 2021, force: boolean = false) {
    // This requires an AoC session cookie. Won't work without it. To get the cookie
    // log in to AoC as normal, open the browser dev tools, find the session cookie,
    // copy it then paste it as an environment variable named AOC_SESSION

    const cookie = env.AOC_SESSION;
    if (!cookie) {
        throw new Error("AoC session cookie not found");
    }
    const fname = getInputFilename(day);
    if (fs.existsSync(fname) && !force) {
        console.warn(`Input file ${fname} already exists. To force an overwrite specify the force parameter 'ff'.`);
        return;
    }

    const url = `https://adventofcode.com/${year}/day/${day}/input`;
    //const cf = await import('cross-fetch');
    //const res = await cf.fetch(url, { headers: { 'cookie': `session=${cookie}` }});
    const res = await fetch(url, { headers: { 'cookie': `session=${cookie}` }});
    if (res.status === 200) {
        const content = await res.text();
        await writeFile(fname, content);
        console.info(`Downloaded input file ${fname}`);
    } else if (res.status === 404) {
        console.error(`Download of input ${fname} failed. Input data/file not found.`);
    } else {
        console.error(`Download of input ${fname} failed. `, res);
    }
}

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

export function lineToInts(line: string, separator: string = ','): number[] {
    let result: number[] = [];
    line.split(separator).forEach(v => {
        let n = parseInt(v.trim(), 10);
        if (!isNaN(n)) {
            result.push(n);
        }
    });
    return result;
}

export function linesToInts(lines: string[], separator: string = ','): number[] {
    let result: number[] = [];
    lines.forEach(line => {
        line.split(separator).forEach(v => {
            let n = parseInt(v.trim(), 10);
            if (!isNaN(n)) {
                result.push(n);
            }
        });
    });
    return result;
}

export async function getInputLines(day?: number, keepBlankLines: boolean = false, test: boolean = false): Promise<string[]> {
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
        return keepBlankLines
            ?  data
                .replace(/\r\n/g,'\n') // normalize line endings
                .split('\n')           // split on newline
            : data
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
    const lines = await getInputLines(day, false, test);
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
    const lines = await getInputLines(day, false, test);
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

