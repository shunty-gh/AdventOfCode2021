import { DayRunner } from './day-runner.js';
import { Day01 } from './day01.js';
import { Day02 } from './day02.js';
import { Day03 } from './day03.js';
import { Day04 } from './day04.js';
import { Day05 } from './day05.js';
import { Day06 } from './day06.js';
import { Day07 } from './day07.js';
import { Day08 } from './day08.js';
import { Day09 } from './day09.js';
import { Day10 } from './day10.js';
import { Day11 } from './day11.js';
import { Day12 } from './day12.js';
import { Day13 } from './day13.js';
// import { Day14 } from './day14.js';
// import { Day15 } from './day15.js';
// import { Day16 } from './day16.js';
// import { Day17 } from './day17.js';
// import { Day18 } from './day18.js';
// import { Day19 } from './day19.js';
// import { Day20 } from './day20.js';
// import { Day21 } from './day21.js';
// import { Day22 } from './day22.js';
// import { Day23 } from './day23.js';
// import { Day24 } from './day24.js';
// import { Day25 } from './day25.js';

export class DayFactory {
    public static Day(day: number): DayRunner {
        switch (day) {
            case 1:
                return new Day01();
            case 2:
                return new Day02();
            case 3:
                return new Day03();
            case 4:
                return new Day04();
            case 5:
                return new Day05();
            case 6:
                return new Day06();
            case 7:
                return new Day07();
            case 8:
                return new Day08();
            case 9:
               return new Day09();
            case 10:
                return new Day10();
            case 11:
                return new Day11();
            case 12:
                return new Day12();
            case 13:
                return new Day13();
            // case 14:
            //     return new Day14();
            // case 15:
            //     return new Day15();
            // case 16:
            //     return new Day16();
            // case 17:
            //     return new Day17();
            // case 18:
            //     return new Day18();
            // case 19:
            //     return new Day19();
            // case 20:
            //     return new Day20();
            // case 21:
            //     return new Day21();
            // case 22:
            //     return new Day22();
            // case 23:
            //     return new Day23();
            // case 24:
            //     return new Day24();
            // case 25:
            //     return new Day25();
            default:
                throw new Error(`No handler available for day ${day}`);
        }
    }

    public static Days(days: number[]): DayRunner[] {
        let result: DayRunner[] = [];
        days.forEach(d => result.push(DayFactory.Day(d)));
        return result;
    }
}
