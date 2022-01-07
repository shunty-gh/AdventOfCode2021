#include "aocutil.h"

using namespace std;

uint64_t run(const vector<uint64_t> &start, int days) {
    vector<uint64_t> states{start};
    for (int d = 0; d < days; d++) {
        auto c0 = states[0];
        for (int i = 0; i < 8; i++) {
            states[i] = states[i+1];
        }
        states[6] += c0;
        states[8] = c0;
    }

    uint64_t result = 0;
    for (auto &&s : states) {
        result += s;
    }
    return result;
}

void day06()
{
	auto input = split_ints(get_input_lines(6, false)[0], ',');
    vector<uint64_t> states(9);
    for (auto &&i : input) {
        states[i] += 1;
    }
	printDayResults(6, run(states, 80), run(states, 256));
}
