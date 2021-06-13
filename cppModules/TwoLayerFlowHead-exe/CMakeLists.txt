
project(TwoLayerFlowHead-exe)

set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "libs")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "libs")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "bin")

add_executable(
    TwoLayerFlowHead-exe
    src/main.cpp
    )
