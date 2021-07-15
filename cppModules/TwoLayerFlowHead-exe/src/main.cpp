#include <iostream>
#include <math.h>
//Some reason intellisense will list this as en error
#include <emscripten/emscripten.h>

#define PI 3.14159265

int main(int, char **)
{
    std::cout << "Hello, world!\n";
}

//#ifdef __cplusplus
extern "C"
{
    //#endif

    EMSCRIPTEN_KEEPALIVE void myHelloWorldFunction(int argc, char **argv)
    {
        printf("MyFunction Called\n Hello World");
    }

    EMSCRIPTEN_KEEPALIVE void ComputePoints(float *oDataX, float *oDataY, float *oDataZ, int iRows, int iCols)
    {
        //(21 June 2021) Temp testing to see how values can
        // be passed to JS
        // Refactor this logic to use std vectors internally
        std::cout << "Printing inside cpp" << std::endl;
        for (int ii = 0; ii < iRows; ii++)
        {
            for (int jj = 0; jj < iCols; jj++)
            {
                oDataX[jj + ii * iCols] = ii;
                oDataY[jj + ii * iCols] = jj;
                double theta = 10 * oDataX[jj + ii * iCols] + oDataY[jj + ii * iCols];
                oDataZ[jj + ii * iCols] = 10 * sin(theta * PI / 180.0);
            }
        }

        for (int ii = 0; ii < iRows; ii++)
        {
            for (int jj = 0; jj < iCols; jj++)
            {
                std::cout << "X " << oDataX[jj + ii * iCols] << std::endl;
                std::cout << "Y " << oDataY[jj + ii * iCols] << std::endl;
                std::cout << "Z " << oDataZ[jj + ii * iCols] << std::endl;
            }
        }

        // oDataX[0] = 0;
        // oDataX[1] = 10;
        // oDataX[2] = 0;
        // oDataX[3] = -10;

        // oDataY[0] = 10;
        // oDataY[1] = 0;
        // oDataY[2] = -10;
        // oDataY[3] = 0;

        // oDataZ[0] = 0;
        // oDataZ[1] = 0;
        // oDataZ[2] = 0;
        // oDataZ[3] = 0;
    }

    //#ifdef __cplusplus
}
//#endif