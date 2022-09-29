use super::common::*;

pub fn run() {
    let day = 3;
    let lines = get_input_strs(&day).unwrap();

    let part1 = do_part1(&lines);
    let part2 = do_part2(&lines);

    print_day_results(day, part1, part2);
}

fn do_part1(lines: &[String]) -> i64 {
    let mut ones: [i32; 12] = [0; 12];
    let mut zeros: [i32; 12] = [0; 12];

    // Convoluted way
    // let vints: Vec<Vec<u32>> = lines.iter()
    //      .map(|s| s.chars()
    //          .map(|ch| ch.to_digit(10).unwrap())
    //          .collect())
    //     .collect();
    //
    // for vint in vints.iter() {
    //     for (i, v) in vint.iter().enumerate() {
    //         if *v == 1 {
    //             ones[i] += 1;
    //         } else {
    //             zeros[i] += 1;
    //         }
    //     }
    // }

    // ...or, somewhat more simply, perhaps
    for s in lines.iter() {
        for (i, ch) in s.chars().enumerate() {
            if ch == '1' {
                ones[i] += 1;
            } else {
                zeros[i] += 1;
            }
        }
    }

    let mut gamma = 0i64;
    for i in 0..12 {
        gamma <<= 1;
        if ones[i] > zeros[i] {
            gamma += 1;
        }
    }
    let epsilon = gamma ^ 0b111111111111;
    return gamma * epsilon;
}

fn do_part2(lines: &[String]) -> i64 {
    let o2rating = find_rating(lines, 1);
    let co2rating = find_rating(lines, 0);
    return o2rating * co2rating;
}

fn find_rating(lines: &[String], rating_type: usize) -> i64 {
    const RATING_SELECTOR: [[char; 2]; 2] = [['1', '0'], ['0', '1']];

    let mut filt: Vec<_ > = lines.iter().cloned().collect();
    let mut index = 0;
    while filt.len() > 1 {
        let c0= filt.iter()
            .filter(|&line| line.chars().nth(index).unwrap() == '0')
            .count();
        let c1 = filt.len() - c0;

        let v = if c0 > c1 { RATING_SELECTOR[rating_type][0] } else { RATING_SELECTOR[rating_type][1] };
        filt = filt.iter()
            .filter(|&s| s.chars().nth(index).unwrap() == v)
            .cloned()
            .collect();
        index += 1;
    }

    let s = &filt[0];
    return i64::from_str_radix(s, 2).unwrap();
}