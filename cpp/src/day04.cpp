#include "aocutil.h"

using namespace std;

struct Cell {
	int value;
	bool seen;
};

struct Board {
	vector<Cell> cells;
	bool won;
};

int sum_unmarked(const Board &board) {
	int result = 0;
	for (auto &&cell : board.cells) {
		if (!cell.seen) {
			result += cell.value;
		}
	}
	return result;
}

bool has_won(const Board &board) {
	if (board.won) {
		return true;
	}

	auto cells = board.cells;
    for (int i = 0; i < 5; i++) {
        int j = i * 5;
        bool cwin = cells[i].seen && cells[i+5].seen && cells[i+10].seen && cells[i+15].seen && cells[i+20].seen;
        bool rwin = cells[j].seen && cells[j+1].seen && cells[j+2].seen && cells[j+3].seen && cells[j+4].seen;
        if (rwin || cwin) {
            return true;
		}
	}
    return false;
}

void day04() {
	auto input = get_input_lines(4, false);
	auto draws = split_ints(input[0], ',');

	int num_boards = (input.size() - 1) / 6;  // 5 lines per board plus one blank line, skip the first line
	int lsz = input[2].size();
	// Build the bingo boards
	vector<Board> boards{};
	for (int i = 0; i < num_boards; i++) {
		vector<Cell> cells{};
		int boardstart = (i * 6) + 2;
		for (int bi = 0; bi < 5; bi++) {
			auto line = input[boardstart+bi];
			for (int p = 0; p < lsz; p += 3) {
				//int n = 10 * (line[p] != ' ' ? line[p] - '0' : 0) + (line[p+1] != ' ' ? line[p+1] - '0' : 0);
				int n = 10 * (line[p] & 15) + (line[p+1] & 15); // much neater
				cells.push_back({n, false});
			}
		}
		boards.push_back(Board{ cells, false});
	}

	// Play the game
	int first = 0, last = 0;
	for (auto &&draw : draws) {
		for (auto &&board : boards) {
			if (board.won) {
				continue;
			}
			for (auto &&el : board.cells) {
				if (el.value == draw) {
					el.seen = true;
					if (has_won(board)) {
						board.won = true;
						if (first == 0) {
							first = draw * sum_unmarked(board);
						}
						last = draw * sum_unmarked(board);
					}
				}
			}
		}
	}

	printDayResults(4, first, last);
}
