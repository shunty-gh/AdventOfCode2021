import { DayFactory } from "./day-factory";

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

//** Main runner */
(async () => {
    const days = getDaysFromCommandLine();
    const daystorun = DayFactory.Days(days);
    daystorun.forEach(async d => {
        await d.run();
    });
})().catch(e => {
    console.error("Fatal error.", e);
});
