import { getInputLines, getInputInts, getInputFloats } from './common';

export interface DayRunner {
    run: () => Promise<void>;
}

export abstract class DayBase implements DayRunner {
    protected day: number = 0;

    constructor(day: number) {
        if (!day || day <= 0) {
            throw new Error("Day number must be between 1 and 25 (inc!)")
        }
        this.day = day;
    }

    protected async getInputLines(): Promise<string[]> {
        return await getInputLines(this.day);
    }

    protected async getInputInts(): Promise<number[]> {
        return await getInputInts(this.day);
    }

    protected async getInputFloats(): Promise<number[]> {
        return await getInputFloats(this.day);
    }

    public abstract run(): Promise<void>;
}