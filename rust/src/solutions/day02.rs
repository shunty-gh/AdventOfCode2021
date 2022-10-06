use crate::common::*;
use regex::Regex;

pub fn run() {
    let day = 2;
    let v = get_input_strs(&day).unwrap();

    let re = Regex::new(r"^(up|down|forward) (\d)$").unwrap();
    let (mut x1, mut x2) = (0i64, 0i64);
    let (mut y1, mut y2) = (0i64, 0i64);
    let mut aim = 0i64;
    for s in v.iter() {
        let cap = re.captures(s).unwrap();
        let dir = &cap[1];
        let units = &cap[2].parse::<i64>().unwrap();
        match dir {
            "forward" => {
                x1 += units;
                x2 += units;
                y2 += aim * units;
            },
            "down" => {
                y1 += units;
                aim += units;
            },
            "up" => {
                y1 -= units;
                aim -= units;
            },
            _ => panic!("Unknown direction {}", dir),
        }
    }

    print_day_results(&day, &(x1 * y1), &(x2 * y2));
}