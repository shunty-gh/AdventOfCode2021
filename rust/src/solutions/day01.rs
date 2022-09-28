use super::common::*;

pub fn run() {
    let day = 1;
    let v = get_input_ints(&day).unwrap();

    let (mut part1, mut part2) = (0, 0);

    // Using array indexing
    for i in 0..v.len() - 1 {
        // Part 1
        if v[i+1] > v[i] {
            part1 += 1;
        }
        // Part 2
        if i > 1 && v[i+1] > v[i-2] { // v[i-1] + v[i] + v[i+1] > v[i-2] + v[i-1] + v[i]
            part2 += 1;
        }
    }

    print_day_results(day, part1, part2);
}