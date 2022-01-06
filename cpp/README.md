# Advent of Code 2021

## C++ solutions

Cross platform (hopefully) solutions written in C++.

## Debug

The `tasks.json` file uses `clang++` to build the project. This can easily be changed to use `g++` by just changing the `command` parameter. The
project can be debugged in VS Code by choosing `C++ gdb` from the `Run and debug` drop down, setting appropriate break points and pressing F5.

## Command line builds

For building in Windows it is convenient to use MSYS2/MinGW:

* Install MSYS2 from http://www.msys2.org/
* From MSYS shell
  * pacman -Syu
  * pacman -Su
  * pacman -S --needed base-devel mingw-w64-x86_64-toolchain
  * pacman -S make
  * pacman -S clang
  * pacman -S mingw-w64-x86_64-gcc        # included in ...toolchain
  * pacman -S mingw-w64-x86_64-clang
  * pacman -S mingw-w64-x86_64-make       # included in ...toolchain
  * pacman -S mingw-w64-cross-toolchain   # same as mingw-w64-cross
  * pacman -S mingw-w64-cross-clang
  * pacman -S mingw-w64-ucrt-x86_64-toolchain   # optional
  * pacman -S vim cmake                   # optional

Then either add the MSYS/MinGW binary file paths to the system path (eg 'msys64/usr/bin' and 'msys64/mingw64/bin') or use the relevant MSYS shortcuts to the appropriate shell.

**Various command line choices for building:**

```
$> g++ -std=c++2a -g -o aoc2021 src/*.cpp
$> g++ -std=c++2a -g -o aoc2021.exe src/*.cpp
$> clang++ -std=c++2a -g -o aoc2021 src/*.cpp
$> clang++ -std=c++2a -g -o aoc2021.exe src/*.cpp
$> make -f Makefile.clang
$> make -f Makefile.msvc            ## for Windows only - preferably within a VS developer command prompt
```

Build for Windows 64bit from Linux/WSL 64bit
```
$> clang++ -std=c++2a -target x86_64-pc-windows-gnu -g -o aoc2021-clang-wsl-win64.exe src/*.cpp
```

Build for Windows 324bit from Linux/WSL 64bit
```
$> i686-w64-mingw32-g++ -std=c++2a -m32 -g -o aoc2021-gcc-wsl-win32.exe src/*.cpp -static
```

## CMake

Optionally we can build for various targets using CMake

### From Linux/WSL

All commands run from the `<project_root>`/cpp directory

Install cmake, mingw, build-essential and maybe some other stuff(?)

```
$> sudo apt install build-esssential cmake mingw-w64
Optional:
$> sudo apt install clang
or, perhaps
$> sudo apt install clang-12
```

Build for **Linux host**
```
$> rm -rf build/
$> cmake -B build
$> cmake --build build
$> ./build/aoc2021
```

For **Windows 64 bit**
```
$> rm -rf build/
$> cmake -B build -DCMAKE_TOOLCHAIN_FILE=./cross-compile-linux-win64.cmake
$> cmake --build build
```

For **Windows 32 bit**
```
$> rm -rf build/
$> cmake -B build -DCMAKE_TOOLCHAIN_FILE=./cross-compile-linux-win32.cmake
$> cmake --build build
```
