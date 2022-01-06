#include <vector>
#include "aocutil.h"

using namespace std;

vector<int> countOnes(const vector<string> &src) {
    int bitwidth = src[0].size();
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

int countAt(const vector<string> &src, int bitPos) {
    int result = 0;
    for (auto &&num : src) {
        if (num[bitPos] == '1') {
            result++;
        }
    }
    return result;
}

vector<string> filterByBit(const vector<string> &src, int bitPos, bool requireLargest) {
    int ones = countAt(src, bitPos);
    int zeros = src.size() - ones;

    char seek = (requireLargest && ones >= zeros) || (!requireLargest && ones < zeros) ? '1' : '0';
    vector<string> result{};
    for (auto &&num : src) {
        if (num[bitPos] == seek) {
            result.push_back(num);
        }
    }
    return result;
}

string filterValues(const vector<string> &src, bool requireLargest) {
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
    // Part 1
    auto counts = countOnes(lines);
    int half = lines.size() / 2;
    int gr = 0, er = 0;
    for (int i = 0; i < (int)counts.size(); i++) {
        gr *= 2;
        er *= 2;
        if (counts[i] >= half) {
            gr++;
        } else {
            er++;
        }
    }

    // Part 2
    int ogr = stoi(filterValues(lines, true).c_str(), nullptr, 2);
    int csr = stoi(filterValues(lines, false).c_str(), nullptr, 2);

	printDayResults(3, gr * er, ogr * csr);
}
