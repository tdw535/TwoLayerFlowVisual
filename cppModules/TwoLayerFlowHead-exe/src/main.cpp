#include <iostream>
#include <math.h>
//Some reason intellisense will list this as en error
#include <emscripten/emscripten.h>

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

    EMSCRIPTEN_KEEPALIVE void ComputePoints(float *oData, int iRows, int iCols)
    {
        //(21 June 2021) Temp testing to see how values can
        // be passed to JS
        // Refactor this logic to use std vectors internally
        for (int ii = 0; ii < iRows; ii++)
        {
            for (int jj = 0; jj < iCols; jj++)
            {
                oData[jj + ii * iCols] = (ii + 1) * (jj + 1);
            }
            // oData[ii] = ii;
        }
    }

    //#ifdef __cplusplus
}
//#endif