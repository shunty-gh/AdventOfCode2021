#include <vector>
#include "aocutil.h"

using namespace std;

void day01()
{
	auto input = get_input_ints(1, false);
	int ilen = (int)input.size();
	int part1 = 0;
	for (int i = 1; i < ilen; i++) {
		if (input[i] > input[i-1]) {
			part1++;
		}
	}

	int part2 = 0;
	int last = input[0] + input[1] + input[2];
	for (int i = 2; i < ilen - 1; i++) {
		int curr = input[i - 1] + input[i] + input[i + 1];
		if (curr > last) {
			part2++;
		}
		last = curr;
	}

	//printDayResult(1, 1, part1);
	//printDayResult(1, 2, part2);
	printDayResults(1, part1, part2);
}
