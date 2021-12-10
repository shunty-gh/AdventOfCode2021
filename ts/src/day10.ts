import { DayBase } from './day-runner.js';

// https://adventofcode.com/2021/day/10

const cscore = [   3,  57, 1197, 25137 ]; // corrupt scores
const ascore = [   1,   2,    3,     4 ]; // autocomplete scores
const opens  = [ '(', '[',  '{',   '<' ];
const closes = [ ')', ']',  '}',   '>' ];

export class Day10 extends DayBase {
    constructor() {
        super(10);
    }

    public async run(): Promise<void> {
        const lines = await this.getInputLines();
        // const lines = [                     // expect P1: 26397; P2: 288957
        //     '[({(<(())[]>[[{[]{<()<>>',
        //     '[(()[<>])]({[<{<<[]>>(',
        //     '{([(<{}[<>[]}>{[]{[(<()>',
        //     '(((({<>}<{<{<>}{[]{[]{}',
        //     '[[<[([]))<([[{}[[()]]]',
        //     '[{[{({}]{}}([{[{{{}}([]',
        //     '{<[[]]>}<{[{[{[]{()[[[]',
        //     '[<(<(<(<{}))><([]([]()',
        //     '<{([([[(<>()){}]>(<<{{',
        //     '<{([{{}}[<[[[<>{}]]]>[]]',
        // ];

        let part1 = 0;
        let autocompletescores: number[] = []
        lines.forEach((line, index) => {
            let corrupt = false;
            let stack: string[] = [];
            for (let i = 0; i < line.length; i++) {
                let ch = line[i];
                if (opens.includes(ch)) {
                    stack.push(ch);
                } else {
                    let opener = stack.pop() || "";
                    let oidx = opens.indexOf(opener);
                    if (ch !== closes[oidx]) {
                        //console.log(`line ${index} expected ${closes[oidx]} but found ${ch}`);
                        corrupt = true;
                        part1 += cscore[closes.indexOf(ch)];
                        break;
                    }
                }
            }
            if (!corrupt) {
                //let completion = '';
                let score = 0;
                while (stack.length > 0) {
                    let opener = stack.pop() || "";
                    let oidx = opens.indexOf(opener)
                    //completion += closes[oidx];
                    score = (score * 5) + ascore[oidx];
                }
                //console.log('Completion', completion);
                autocompletescores.push(score);
            }
        });

        autocompletescores.sort((a,b) => +a - +b); // Otherwise JavaScript will sort as if it were strings. Marvellous.
        const mid = ((autocompletescores.length - 1) / 2);
        //console.log('Autocomplete scores', autocompletescores, mid);
        console.info(`Day ${this.day}`);
        console.info(`  Part 1:`, part1);
        console.info(`  Part 2:`, autocompletescores[mid]);
        console.info('');
    }
}