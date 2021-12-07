import { DayBase } from './day-runner.js';

interface BingoCard {
    numbers: BingoElement[];
    hasWon: boolean;
}

interface BingoElement {
    state: boolean;
    value: number;
}

export class Day04 extends DayBase {
    constructor() {
        super(4);
    }

    public async run(): Promise<void> {
        const lines = await this.getAllInputLines();
        const draws = lines[0].trim().split(',');
        let cards: BingoCard[] = [];
        let card: BingoCard;
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line || line == '') {
                // new card
                card = { numbers: [], hasWon: false };
                cards.push(card);
                continue;
            }
            const row = lines[i].trim().split(' ');
            row.forEach(v => {
                if (v.trim()) {
                    let el: BingoElement = {
                        state: false,
                        value: parseInt(v),
                    };
                    card.numbers.push(el);
                }
            });
        }

        //console.log('draw count', draws.length);
        //console.log('card count', cards.length);

        let firstWinner = null;
        let lastWinner = null;
        let haveWinner = false;
        let lastDraw = 0, lastDrawWinner = 0;
        for (let i = 0; i < draws.length; i++) {
            let thisDraw = parseInt(draws[i], 10);
            for (let cidx = 0; cidx < cards.length; cidx++) {
                let c = cards[cidx];
                if (c.hasWon) {
                    continue;
                }
                lastDraw = thisDraw;
                c.numbers.forEach(n => {
                    if (n.value === lastDraw) {
                        n.state = true;
                    }
                });
                // check for completed line
                let nums = c.numbers;
                for (let rc = 0; rc < 5; rc++) {
                    let rindex = rc * 5;
                    if ((nums[rindex].state
                       && nums[rindex + 1].state
                       && nums[rindex + 2].state
                       && nums[rindex + 3].state
                       && nums[rindex + 4].state
                    ) || (nums[rc].state
                       && nums[rc + 5].state
                       && nums[rc + 10].state
                       && nums[rc + 15].state
                       && nums[rc + 20].state)
                    ) {
                        //console.log("We have a winner", c);
                        if (!firstWinner) {
                            firstWinner = c;
                            lastDrawWinner = lastDraw;
                        }
                        c.hasWon = true;
                        haveWinner = true;
                        lastWinner = c;
                        break;
                    }
                }
                // if (haveWinner) {
                //     break;
                // }
            }
            // if (haveWinner) {
            //     break;
            // }
        }

        // Calculate score
        let uncalled1 = 0, uncalled2 = 0;
        firstWinner?.numbers.forEach(n => {
            if (!n.state) {
                uncalled1 += n.value;
            }
        });
        lastWinner?.numbers.forEach(n => {
            if (!n.state) {
                uncalled2 += n.value;
            }
        });
        console.info(`Day ${this.day}`);
        console.info(`  Part 1:`, uncalled1 * lastDrawWinner);
        console.info(`  Part 2:`, uncalled2 * lastDraw);
        console.info('');
    }
}