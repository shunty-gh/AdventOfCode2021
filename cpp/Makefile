# Simple g++ makefile for Linux based machines

DEBUG_FLAGS = -O0 -g
PERF_FLAGS = -O3

CC = g++
CXXFLAGS = -std=c++2a  # older g++ version(s)

TARGET = aoc2021
OBJ_DIR = ./obj
DEPS = src/*.h
#SRC = $(wildcard src/*.cpp)
SRC = src/*.cpp

$(TARGET): $(SRC) $(DEPS)
	$(CC) $(CXXFLAGS) $(DEBUG_FLAGS) -o $(TARGET) $(SRC)

.PHONY: clean

all:  $(TARGET)

release:
	$(CC) $(CXXFLAGS) $(PERF_FLAGS) -o $(TARGET) $(SRC)

clean:
	-$(RM) -f $(OBJ_DIR)/*.obj *.obj *.exe *.ilk *.pdb ./aoc2021
