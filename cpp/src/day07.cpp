#include "aocutil.h"

using namespace std;

void day07()
{
	auto input = split_ints(get_input_lines(7, false)[0], ',');

    uint64_t best1 = 0, best2 = 0, sum1, sum2;
    for (auto &&i : input) {
        sum1 = 0, sum2 = 0;
        for (auto &&j : input) {
            sum1 += abs(i - j);
            sum2 += abs(i - j) * (abs(i - j) + 1) / 2;
        }
        if (sum1 < best1 || best1 == 0) {
            best1 = sum1;
        }
        if (sum2 < best2 || best2 == 0) {
            best2 = sum2;
        }
    }
	printDayResults(7, best1, best2);
}
