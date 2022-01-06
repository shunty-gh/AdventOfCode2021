// AoC2021.cpp : Defines the entry point for the application.
//

#include <chrono>
#include <iostream>
#include <string>
#include <vector>

#include "aocutil.h"

using namespace std;

static const std::vector<aoc_t> aocDays = {
    { day01 }, { day02 }, { day03 }, { day04 }, { day05 },
    { day06 }, { day07 }, { day08 }, { day09 }, { day10 },
    { day11 }, { day12 }, { day13 }, { day14 }, { day15 },
    { day16 }, { day17 }, { day18 }, { day19 }, { day20 },
    { day21 }, { day22 }, { day23 }, { day24 }, { day25 },
};

//int main(int argc, const char* argv[]) {
int main() {
    std::cout << "\n" << WHITE << BK_RED << " *** Advent of Code 2021 *** " << RESET << "\n\n";

    // Day params
    // ToDo : Parse command line args and get day numbers. Maybe with https://github.com/CLIUtils/CLI11
    vector<int> daysToInclude{ 1,2,3,4 };

    for (size_t di = 0; di < daysToInclude.size(); di++) {
        int day = daysToInclude[di];
        auto& dayFn = aocDays[day - 1];
        if (!dayFn.fn) continue;

        try {
            auto begin = chrono::high_resolution_clock::now();
            dayFn.fn();
            auto end = chrono::high_resolution_clock::now();
            auto ms = chrono::duration_cast<chrono::milliseconds>(end - begin).count();
            if (ms > 1) {
                std::cout << BLUE << "Day " << day << " " << YELLOW << "ran in " << ms << "ms" << RESET << "\n\n";
            }
            else {
                ms = std::chrono::duration_cast<std::chrono::microseconds>(end - begin).count();
                std::cout << BLUE << "Day " << day << " " << YELLOW << "ran in " << ms << "µs)" << RESET << "\n\n";
            }
        }
        catch (const std::exception& e) {
            std::cout << RED << "ERROR " << RESET << "in day " << YELLOW << day << RESET << ": " << e.what() << "\n";
        }
        catch (...) {
            std::cout << RED << "UNKNOWN ERROR " << RESET << "in day " << YELLOW << day << RESET << "\n";
        }
    }

}

// Days to do...
void day05() { }
void day06() { }
void day07() { }
void day08() { }
void day09() { }
void day10() { }
void day11() { }
void day12() { }
void day13() { }
void day14() { }
void day15() { }
void day16() { }
void day17() { }
void day18() { }
void day19() { }
void day20() { }
void day21() { }
void day22() { }
void day23() { }
void day24() { }
void day25() { }
