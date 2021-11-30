import { fetchInput } from './common';
import { DayFactory } from "./day-factory";

const thisYear = 2021;

function getDaysFromCommandLine(): number[] {
    const args = process.argv.slice(2);
    let result: number[] = [];
    // Search for plain numbers (1..25)
    args.forEach(a => {
        let n = parseInt(a, 10);
        if (!isNaN(n) && n > 0 && n <= 25) {
            result.push(n);
        }
    });
    // If no numbers on command line then use todays day
    // number if we're in range Dec 1..25 or 1 otherwise.
    if (result.length === 0) {
        const dt = new Date();
        if (dt.getMonth() === 11 && dt.getDay() <= 25) { // getMonth is 0 based but getDay isn't, of course!
            result.push(dt.getDay());
        } else {
            result.push(1);
        }
    }
    return result;
}

/** Check command line args for 'f' or 'ff' parameters. If so
  try and download input data for the supplied days. If 'f' is
  specified then don't download if the file already exists. If
  'ff' is specified then overwrite any existing file for the given
  day. Return 'true' if we try and download data, false if no
  'f' or 'ff' parameters supplied. */
async function checkFetchInput(days: number[]): Promise<boolean> {
    const args = process.argv.slice(2);
    if (args.includes('f') || args.includes('ff')) {
        const forceIt = args.includes('ff');
        days.forEach(async d => {
            await fetchInput(d, thisYear, forceIt);
        });
        return true;
    }
    return false;
}

//** Main runner */
(async () => {
    const days = getDaysFromCommandLine();
    if (await checkFetchInput(days)) {
        return;
    }
    const daystorun = DayFactory.Days(days);
    daystorun.forEach(async d => {
        await d.run();
    });
})().catch(e => {
    console.error("Fatal error.", e);
});
