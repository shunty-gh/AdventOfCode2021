#include <algorithm>
#include <fstream>
#include <functional>
#include <iostream>
#include <regex>
#include <sstream>
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

std::vector<std::string> split(const std::string &src, const std::string &delim) {
    std::vector<std::string> result;
    size_t start = 0, end = 0, dlen = delim.length();
    std::string token;

    while ((end = src.find(delim, start)) != std::string::npos) {
        token = src.substr(start, end - start);
        start = end + dlen;
        result.push_back(token);
    }
    // ...and the last one
    result.push_back(src.substr(start));
    return result;
}

std::vector<std::string> split(const std::string &src, char delim) {
    std::vector<std::string> result;
    std::stringstream ss(src);
    std::string item;

    while (getline(ss, item, delim)) {
        result.push_back (item);
    }
    return result;
}

// Borrowed from https://stackoverflow.com/a/64886763
std::vector<std::string> split_r(const std::string str, const std::string regex_str) {
    std::regex regexz(regex_str);
    std::vector<std::string> list(
        std::sregex_token_iterator(str.begin(), str.end(), regexz, -1),
        std::sregex_token_iterator());
    return list;
}

std::vector<int> split_ints(const std::string &s, char delim) {
    std::vector<int> result;
    std::stringstream ss (s);
    std::string item;

    while (getline(ss, item, delim)) {
        result.push_back(std::stoi(item));
    }
    return result;
}