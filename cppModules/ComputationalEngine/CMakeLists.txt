project(ComputationalEngine)


# include_directories(include)

set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "lib")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "lib")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "bin")

add_library( # Sets the name of the library.
        ComputationalEngine

        # Sets the library as a shared library.
        STATIC

        # Provides a relative path to your source file(s).
        src/Solver.cpp
        src/FFT2DHandler.cpp
)

target_include_directories(ComputationalEngine PUBLIC
                          "${PROJECT_BINARY_DIR}"
                          "./include"
                          )

target_include_directories(ComputationalEngine PUBLIC
"${PROJECT_BINARY_DIR}"
"${CMAKE_SOURCE_DIR}/cppModules/ThirdParty/fftw-3.3.9_Emscripten/include"
)

target_link_libraries(ComputationalEngine PUBLIC ${CMAKE_SOURCE_DIR}/cppModules/ThirdParty/fftw-3.3.9_Emscripten/lib/libfftw3.a)



