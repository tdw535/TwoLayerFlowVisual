cmake_minimum_required(VERSION 3.0.0)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++17")


project(WebRunner  VERSION 0.1.0)



add_subdirectory(cppModules)

include(CTest)
enable_testing()

set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})

set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/build)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/build)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)


target_link_options(WebRunner PRIVATE 
-sEXPORTED_FUNCTIONS=['_main','_myHelloWorldFunction','_ComputePoints','_malloc','_free'] 
-sEXPORTED_RUNTIME_METHODS=['ccall','cwrap']
-sEXPORT_ES6=1
-sMODULARIZE=1
-sEXPORT_NAME="CreateMyCPPModule"
)
include(CPack)
