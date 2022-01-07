#include "aocutil.h"

using namespace std;

/*
 Using a map<Point, int> takes about 300ms on this machine. An unordered_map<string, int> using "x_y" as
 the key takes about 20% longer (presumably just creating the string key). An unordered_map<Point, int>
 using hash<int> on both parts of the Point takes about 3x as long but using an unordered_map<Point, int>
 with a simple bit shift of x or'd with y reduces the time to about 130ms.
 However, the unordered_map<> requires setting up the hash function and operator== whereas the map<> just
 requires the operator< to be defined. Neither are arduos but, still, the map<> is easier with a bit of
 a time penalty.
*/

struct Point {
    int x, y;
    bool operator<(const Point& p) const {
        return x == p.x ? y < p.y : x < p.x;
    }
    bool operator==(const Point& p) const {
        return x == p.x && y == p.y;
    }
};
namespace std {
// require the hash function for the unordered_map<Point, int>
template <> struct hash<Point> {
    inline size_t operator()(const Point &p) const {
        // This is mega-slow
        //hash<int> ihash;
        //return ihash(p.x) ^ ihash(p.y);
        return ((uint64_t)p.x << 32) | p.y;
    }
};
}

struct Segment {
    Point from, to;
    Segment(int x1, int y1, int x2, int y2){ from = Point{x1, y1}; to = Point{x2, y2}; };
};

const string Pattern{R"((\d+),(\d+) -> (\d+),(\d+))"};
const regex re{Pattern};

int count_intersections(const vector<Segment> &segments, bool diagonals) {
    unordered_map<Point, int> grid{};
    for (auto &&seg : segments) {
        int dx = seg.from.x == seg.to.x ? 0 : seg.from.x < seg.to.x ? 1 : -1;
        int dy = seg.from.y == seg.to.y ? 0 : seg.from.y < seg.to.y ? 1 : -1;

        if (!(diagonals || dx == 0 || dy == 0)) {
            continue;
        }

        int x = seg.from.x - dx;
        int y = seg.from.y - dy;
        while (x != seg.to.x || y != seg.to.y) {
            x += dx, y += dy;
            auto key = Point{x,y};
            grid[key]++;
        }
    }

    // It seems to be quicker to iterate and count at the end rather than maintaining a
    // running total as we go along
    int result = 0;
    for (auto &&p : grid) {
        if (p.second >= 2) {
            result++;
        }
    }
    // or...
    // int result = std::accumulate(std::begin(grid), std::end(grid), 0,
    //     [](const int prev, const auto& el) {
    //         return (el.second >= 2 ? prev + 1 : prev);
    //     });
    return result;
}

void day05() {
    vector<Segment> segments{};
	get_input_lines(5, false, [&segments](string line) {
        smatch sm;
        regex_match(line, sm, re);
        segments.emplace_back(stoi(sm[1]), stoi(sm[2]), stoi(sm[3]), stoi(sm[4]));
    });

	printDayResults(5, count_intersections(segments, false), count_intersections(segments, true));
}
