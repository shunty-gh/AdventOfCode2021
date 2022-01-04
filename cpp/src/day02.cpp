#include <regex>
#include <vector>
#include "aocutil.h"

using namespace std;

const string Pattern{R"((forward|down|up) (\d+))"};
const regex re{Pattern};

void day02()
{
    auto lines = get_input_lines(2, false);
    smatch sm;
    int x = 0, y1 = 0, y2 = 0;
    for (auto &&line : lines) {
        if (!regex_match(line, sm, re)) {
            throw invalid_argument("Error matching input line: " + line);
        }

        string dir = sm[1];
        int v = stoi(sm[2]);
        if (dir == "forward") {
            x += v;
            y2 += (y1 * v);
        } else if (dir == "down") {
            y1 += v;
        } else {
            y1 -= v;
        }
    }

	printDayResults(2, x * y1, x * y2);
}
