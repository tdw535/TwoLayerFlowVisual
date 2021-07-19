cmake_minimum_required(VERSION 3.16)

project(TwoLayerFlowHead-exe)


# This include seems to work better
include_directories("/usr/include/eigen3")

set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "libs")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "libs")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "bin")

add_executable(
    TwoLayerFlowHead-exe
    src/main.cpp
    )
