cmake_minimum_required(VERSION 3.13)

project(aoc2021 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
#set(CMAKE_CXX_COMPILER clang++)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Wextra")

include_directories(src)
file(GLOB days CONFIGURE_DEPENDS src/day*.cpp)

add_executable(aoc2021 src/aoc2021.cpp src/aocutil.cpp ${days})
