# Set the minimum required version of CMake.
cmake_minimum_required(VERSION 3.18.1)

# Set the project name.
project(react_native_project)

# Specify the C++ standard.
set(CMAKE_CXX_STANDARD 17)

# Define the path to the native source code.
# Adjust this path if your C++ code is in a different location.
set(SOURCE_FILES
    src/main/cpp/native-lib.cpp
)

# Add the shared library.
add_library( # Specifies the name of the library.
             native-lib

             # Specifies that it is a shared library.
             SHARED

             # Provides the path to the source file(s).
             ${SOURCE_FILES})

# Locate the NDK's 'log' library, used for Android logging.
find_library( # Sets the name of the path variable.
              log-lib

              # Specifies the NDK library name.
              log)

# Link libraries.
target_link_libraries( # Specifies the target library.
                       native-lib

                       # Links the log library to the target library.
                       ${log-lib})
