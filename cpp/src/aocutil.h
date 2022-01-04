#ifndef _AOCUTIL_H
#define _AOCUTIL_H

#include <array>
#include <iostream>
#include <functional>
#include <sstream>
#include <string>
#include <vector>

struct aoc_t {
    void(*fn)();
};

void day01();
void day02();
void day03();
void day03();
void day04();
void day05();
void day06();
void day07();
void day08();
void day09();
void day10();
void day11();
void day12();
void day13();
void day14();
void day15();
void day16();
void day17();
void day18();
void day19();
void day20();
void day21();
void day22();
void day23();
void day24();
void day25();

void get_input_lines(int, bool, const std::function<void(std::string)>&);
std::vector<std::string> get_input_lines(int, bool);
std::vector<int> get_input_ints(int, bool);
void printDayResult(int, int, int);
void printDayResult(int, int, std::string);
void printDayResults(int, int, int);

// ANSI Colours
// Colours on https://ss64.com/nt/syntax-ansi.html

#define BLACK               "\x1B[30m"
#define RED                 "\x1B[31m"
#define GREEN               "\x1B[32m"
#define YELLOW              "\x1B[33m"
#define BLUE                "\x1B[34m"
#define MAGENTA             "\x1B[35m"
#define CYAN                "\x1B[36m"
#define WHITE               "\x1B[37m"

#define BRIGHT_BLACK        "\x1B[90m"
#define BRIGHT_RED          "\x1B[91m"
#define BRIGHT_GREEN        "\x1B[92m"
#define BRIGHT_YELLOW       "\x1B[93m"
#define BRIGHT_BLUE         "\x1B[94m"
#define BRIGHT_MAGENTA      "\x1B[95m"
#define BRIGHT_CYAN         "\x1B[96m"
#define BRIGHT_WHITE        "\x1B[97m"

#define BK_BLACK            "\x1B[40m"
#define BK_RED              "\x1B[41m"
#define BK_GREEN            "\x1B[42m"
#define BK_YELLOW           "\x1B[43m"
#define BK_BLUE             "\x1B[44m"
#define BK_MAGENTA          "\x1B[45m"
#define BK_CYAN             "\x1B[46m"
#define BK_WHITE            "\x1B[47m"

#define BK_BRIGHT_BLACK     "\x1B[100m"
#define BK_BRIGHT_RED       "\x1B[101m"
#define BK_BRIGHT_GREEN     "\x1B[102m"
#define BK_BRIGHT_YELLOW    "\x1B[103m"
#define BK_BRIGHT_BLUE      "\x1B[104m"
#define BK_BRIGHT_MAGENTA   "\x1B[105m"
#define BK_BRIGHT_CYAN      "\x1B[106m"
#define BK_BRIGHT_WHITE     "\x1B[107m"

#define RESET               "\x1B[0m"
#define BOLD                "\x1B[1m"
#define UNDERLINE           "\x1B[4m"
#define NO_UNDERLINE        "\x1B[24m"
#define INVERSE             "\x1B[7m"
#define NON_INVERSE         "\x1B[27m"

#define COLOR_0      BLACK
#define COLOR_1      BLUE
#define COLOR_2      GREEN
#define COLOR_3      CYAN
#define COLOR_4      RED
#define COLOR_5      MAGENTA
#define COLOR_6      YELLOW
#define COLOR_7      WHITE
#define COLOR_8      BRIGHT_BLACK
#define COLOR_9      BTIGHT_BLUE
#define COLOR_A      BRIGHT_GREEN
#define COLOR_B      BRIGHT_CYAN
#define COLOR_C      BRIGHT_RED
#define COLOR_D      BRIGHT_MAGENTA
#define COLOR_E      BRIGHT_YELLOW
#define COLOR_F      BRIGHT_WHITE

#endif
