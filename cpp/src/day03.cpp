#include <vector>
#include "aocutil.h"

using namespace std;

vector<int> countOnes(vector<string> src) {
    int bitwidth = src[0].size();
    int numcount = src.size();
    vector<int> result(bitwidth, 0);
    for (auto &&num : src) {
        for (int i = 0; i < bitwidth; i++) {
            if (num[i] == '1') {
                result[i] += 1;
            }
        }
    }
    return result;
}

int countAt(vector<string> src, int bitPos) {
    int result = 0;
    for (auto &&num : src) {
        if (num[bitPos] == '1') {
            result += 1;
        }
    }
    return result;
}

vector<string> filterByBit(vector<string> src, int bitPos, bool requireLargest) {
    int ones = countAt(src, bitPos);
    int zeros = src.size() - ones;

    char seek = '0';
    if (ones == zeros && requireLargest) {
        seek = '1';
    } else {
        char mostch = ones > zeros ? '1' : '0';
        char leastch = ones < zeros ? '1' : '0';
        seek = requireLargest ? mostch : leastch;
    }

    vector<string> result{};
    for (auto &&num : src) {
        if (num[bitPos] == seek) {
            result.push_back(num);
        }
    }
    return result;
}

string filterValues(vector<string> src, bool requireLargest) {
    int bp = 0;
    auto filt = src;
    while (filt.size() > 1) {
        filt = filterByBit(filt, bp, requireLargest);
        bp++;
    }
    return filt[0];
}

void day03()
{
    auto lines = get_input_lines(3, false);
    auto counts = countOnes(lines);

    int half = lines.size() / 2;
    int gr = 0, er = 0;
    for (int i = 0; i < counts.size(); i++) {
        if (counts[i] >= half) {
            gr = (gr << 1) + 1;
            er = (er << 1);
        } else {
            gr = (gr << 1);
            er = (er << 1) + 1;
        }
    }

    // Part 2
    auto ogr = stoi(filterValues(lines, true).c_str(), nullptr, 2);
    auto csr = stoi(filterValues(lines, false).c_str(), nullptr, 2);

	printDayResults(2, gr * er, ogr * csr);
}
