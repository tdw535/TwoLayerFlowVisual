
cmake_minimum_required(VERSION 3.16)




project(TwoLayerFlowHead-exe)


# This include seems to work better
include_directories("/usr/include/eigen3")

set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "libs")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "libs")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "bin")

add_subdirectory(ComputationalEngine)


add_executable(
    WebRunner
    WebRunner/src/main.cpp
    )

target_include_directories(WebRunner PUBLIC ComputationalEngine/include)
target_link_libraries(WebRunner PUBLIC ComputationalEngine)

# add the binary tree to the search path for include files
# so that we will find TutorialConfig.h
target_include_directories(WebRunner PUBLIC
                          "${PROJECT_BINARY_DIR}"
                          "${PROJECT_SOURCE_DIR}/ComputationalEngine"
                          )