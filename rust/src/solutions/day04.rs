use crate::common::*;
use regex::Regex;

#[derive(Debug)]
#[derive(Clone)]
#[derive(Copy)]
struct Cell {
    value: i32,
    drawn: bool
}

impl Cell {
    fn new() -> Self {
        Cell {
            value: 0,
            drawn: false,
        }
    }
}

#[derive(Debug)]
struct Board {
    cells: [Cell; 25],
    complete: bool,
}

impl Board {
    fn new() -> Self {
        Board {
            complete: false,
            cells: [Cell::new(); 25],
        }
    }

    fn set_row(&mut self, row: &usize, values: &Vec<i32>) {
        assert_eq!(5, values.len(), "Expecting exactly 5 values");
        let ri = row * 5;
        for i in 0..5 {
            self.cells[ri + i].value = values[i];
        }
    }

    fn check_drawn(&mut self, drawn_no: i32) -> bool {
        for c in self.cells.iter_mut() {
            if c.value == drawn_no {
                c.drawn = true;
                return true;
            }
        }
        false
    }

    fn check_complete(&mut self) -> bool {
        if self.complete {
            return true;
        }

        for i in 0..5 {
            let ri = i * 5;
            // check rows & cols
            if (self.cells[ri].drawn && self.cells[ri + 1].drawn && self.cells[ri + 2].drawn && self.cells[ri + 3].drawn && self.cells[ri + 4].drawn)
                || (self.cells[i].drawn && self.cells[i + 5].drawn && self.cells[i + 10].drawn && self.cells[i + 15].drawn && self.cells[i + 20].drawn){
                self.complete = true;
                return true;
            }
        }
        return false;
    }

    fn unmarked_sum(&self) -> i32 {
        let mut result = 0;
        for c in self.cells.iter() {
            if !c.drawn {
                result += c.value;
            }
        }
        result
    }
}

pub fn run() {
    let day = 4;
    let lines = get_input_strs(&day).unwrap();
    // First line is the list of comma separated, drawn numbers followed by a blank line
    let re = Regex::new(r"^\s?(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)$").unwrap();
    let nums: Vec<i32> = lines.first()
        .unwrap()
        .split(',')
        .map(|c| c.parse().unwrap())
        .collect();

    let mut boards: Vec<Board> = Vec::new();
    let mut line_index = 2;
    while line_index < lines.len() {
        let mut board = Board::new();
        for r in 0..5 {
            let line = lines[line_index + r][..].trim_end();
            let cap = re.captures(line).unwrap();
            let mut v: Vec<i32> = Vec::new();
            for i in 1..6 {
                v.push(cap[i].parse::<i32>().unwrap());
            }
            board.set_row(&r, &v);
        }
        boards.push(board);
        line_index += 6; // skip this board and the blank line
    }

    // for b in boards {
    //     println!("{:?}", b);
    // }

    let mut part1 = 0;
    let mut part2 = 0;
    for n in nums {
        //for (i, b) in boards.iter_mut().enumerate() {
        for b in boards.iter_mut() {
            // Skip already completed boards
            if b.complete {
                continue;
            }

            if b.check_drawn(n) {
                if b.check_complete() {
                    let score = b.unmarked_sum() * n;
                    if part1 == 0 {
                        part1 = score;
                    }
                    part2 = score;
                    //println!("Board complete: Board {}; Score {}; Last no {}", i, score, n);
                }
            }
        }
    }
    print_day_results(&day, &part1, &part2);
}
