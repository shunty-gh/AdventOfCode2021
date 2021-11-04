import { DayRunner } from './day-runner';
import { Day01 } from './day01';
import { Day02 } from './day02';
// import { Day03 } from './day03';
// import { Day04 } from './day04';
// import { Day05 } from './day05';
// import { Day06 } from './day06';
// import { Day07 } from './day07';
// import { Day08 } from './day08';
// import { Day09 } from './day09';
// import { Day10 } from './day10';
// import { Day11 } from './day11';
// import { Day12 } from './day12';
// import { Day13 } from './day13';
// import { Day14 } from './day14';
// import { Day15 } from './day15';
// import { Day16 } from './day16';
// import { Day17 } from './day17';
// import { Day18 } from './day18';
// import { Day19 } from './day19';
// import { Day20 } from './day20';
// import { Day21 } from './day21';
// import { Day22 } from './day22';
// import { Day23 } from './day23';
// import { Day24 } from './day24';
// import { Day25 } from './day25';


export class DayFactory {
    public static Day(day: number): DayRunner {
        switch (day) {
            case 1:
                return new Day01();
            case 2:
                return new Day02();
            // case 3:
            //     return new Day03();
            // case 4:
            //     return new Day04();
            // case 5:
            //     return new Day05();
            // case 6:
            //     return new Day06();
            // case 7:
            //     return new Day07();
            // case 8:
            //     return new Day08();
            // case 9:
            //     return new Day09();
            // case 10:
            //     return new Day10();
            // case 11:
            //     return new Day11();
            // case 12:
            //     return new Day12();
            // case 13:
            //     return new Day13();
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
