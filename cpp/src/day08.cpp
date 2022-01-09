#include "aocutil.h"

using namespace std;

void day08()
{
	auto input = get_input_lines(8, false);

    int part1 = 0;
    for (auto &&line : input) {
        auto rhs = split(split(line, " | ")[1], ' ');
        for (auto &&r : rhs) {
            int rl = r.length();
            if (rl == 2 || rl == 3 || rl == 4 || rl == 7) {
                part1++;
            }
        }
    }

    /* Brief analysis of the input shows that each input section of each line
       has exactly one entry each of 2, 3, 4 and 7 characters and 3 entries
       each of both 5 and 6 characters.
       Therefore
         item with 2 elements must map to '1', (c.f)
         3 el => '7' == (a,c,f)
         4 el => '4' == (b,c,d,f)
         7 el => '8' == (a,b,c,d,e,f,g)
         5 el => '2' | '3' | '5' == (a,c,d,e,g) | (a,c,d,f,g) | (a,b,d,f,g)
         6 el => '0' | '6' | '9' == (a,b,c,e,f,g) | (a,b,d,e,f,g) | (a,b,c,d,f,g)
    */
    int part2 = 0;
    for (auto &&line : input) {
        auto inout = split(line, " | ");
        auto lhs = split(inout[0], ' '), rhs = split(inout[1], ' ');

        // Sort - by length NOT alphabetically!
        sort(lhs.begin(), lhs.end(), [](const string& first, const string& second){
            return first.length() < second.length();
        });
        map<char, vector<char>> chmap{};
        map<char, vector<char>> found{};
        // 1st sorted item will have 2 chars, therefore it must be '1', and map to chars c & f
        auto li = lhs[0];
        chmap[li[0]].insert(chmap[li[0]].end(), {'c', 'f'});
        chmap[li[1]].insert(chmap[li[1]].end(), {'c', 'f'});
        found['c'].insert(found['c'].end(), {li[0], li[1]});

        // don't need to bother about the mappping for 'a' which we could derive from the 3 character item == '7'

        li = lhs[2];  // 4 ch => (b,c,d,f) with c,f already seen, therefore other two must be b,d
        for (int i = 0; i < 4; i++) {
            if (!chmap.count(li[i])) {
                chmap[li[i]].push_back('b');
                chmap[li[i]].push_back('d');
                found['b'].push_back(li[i]);
                // don't need to bother storing the 'd'
            }
        }

        string numstr = "";
        for (auto &&r : rhs) {
            switch (r.length()) {
                case 2:
                    numstr += '1';
                    break;
                case 3:
                    numstr += '7';
                    break;
                case 4:
                    numstr += '4';
                    break;
                case 5:
                    // if it contains c & f then it must be '3' (ie it contains both the choices for 'c')
                    if ((r.find(found['c'][0]) != std::string::npos) && (r.find(found['c'][1]) != std::string::npos)) {
                        numstr += '3';
                    // if it contains b & d then it must be '5' (ie it contains both the choices for 'b')
                    } else if (r.find(found['b'][0]) != std::string::npos && r.find(found['b'][1]) != std::string::npos) {
                        numstr += '5';
                    } else {
                        numstr += '2';
                    }
                    break;
                case 6:  // 0,6,9 -> opposite of cases for 2,3,5
                    if (!((r.find(found['c'][0]) != std::string::npos) && (r.find(found['c'][1]) != std::string::npos))) {
                        numstr += '6';
                    } else if (!(r.find(found['b'][0]) != std::string::npos && r.find(found['b'][1]) != std::string::npos)) {
                        numstr += '0';
                    } else {
                        numstr += '9';
                    }
                    break;
                case 7:
                    numstr += '8';
                    break;
                default:
                    cout << "Cannot handle output item " << r << endl;
                    return;
            }
        }
        // cout << numstr << endl;
        part2 += stoi(numstr);
    }

	printDayResults(8, part1, part2);
}
