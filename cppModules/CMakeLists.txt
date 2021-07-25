
cmake_minimum_required(VERSION 3.16)





project(WebRunner)


# This include seems to work better
include_directories("/usr/include/eigen3")



set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "lib")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "lib")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "bin")

include_directories(ComputationalEngine/include)
add_subdirectory(ComputationalEngine)



add_executable(
    WebRunner
    WebRunner/src/main.cpp
    )

target_include_directories(WebRunner PUBLIC
                          "${PROJECT_BINARY_DIR}"
                          "${PROJECT_SOURCE_DIR}/ComputationalEngine"
                          )
target_link_libraries(WebRunner PUBLIC ComputationalEngine)
