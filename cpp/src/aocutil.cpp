#include <algorithm>
#include <fstream>
#include <functional>
#include <string>
#include <vector>
#include "aocutil.h"

/** Read input file for day number and apply a lambda to each line */
void get_input_lines(int dayNumber, bool test, const std::function<void(std::string)>& processLine) {
    std::string dn = std::to_string(dayNumber);
    dn = std::string(2 - dn.length(), '0') + dn;
    std::string fn = "../input/day" + dn + (test ? "-input-test" : "-input");

    std::fstream inputFile(fn, std::ios_base::in | std::ios_base::binary);
    std::string line;
    while (std::getline(inputFile, line)) {
        // Strip CR
        line.erase(remove(line.begin(), line.end(), '\r'), line.end());

        processLine(line);
    }
}

/** Read input file for day number and return a vector of strings */
std::vector<std::string> get_input_lines(int dayNumber, bool test = false) {
    std::vector<std::string> result;
    get_input_lines(dayNumber, test, [&result](std::string line) { result.push_back(line); });
    return result;
}

std::vector<int> get_input_ints(int dayNumber, bool test) {
    std::vector<int> result;
    get_input_lines(dayNumber, test, [&result](std::string line) { result.push_back(std::stoi(line)); });
    return result;
}

void printDayResult(int dayNumber, int part, int result) {
    std::cout << BLUE << "Day " << dayNumber << RESET << ", " << " part " << part << ": " << YELLOW << result << RESET << "\n";
}

void printDayResult(int dayNumber, int part, std::string result) {
    std::cout << BLUE << "Day " << dayNumber << RESET << ", " " part " << part << ": " << YELLOW << result << RESET << "\n";
}

void printDayResults(int dayNumber, int part1, int part2) {
    std::cout << BLUE << "Day " << dayNumber << " " << RESET << "\n";
    std::cout << "  Part 1: " << YELLOW << part1 << RESET << "\n";
    std::cout << "  Part 2: " << YELLOW << part2 << RESET << "\n";
}
