#include <iostream>
#include <math.h>

#include <Eigen/Core>
#include <Eigen/Dense>

//Some reason intellisense will list this as en error
#include <emscripten/emscripten.h>

#define PI 3.14159265

int PrintEigen(Eigen::MatrixX3d m)
{
    //Apparently you can print eigen matrix 3d using cout
    std::cout << m << std::endl;
    return 0;
}

int main(int, char **)
{
    std::cout << "Hello, world!\n";

    Eigen::Matrix3d test; //double precisiou

    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
            test(i, j) = i + j;
    }

    // Print
    PrintEigen(test);
}

//#ifdef __cplusplus
extern "C"
{
    //#endif

    EMSCRIPTEN_KEEPALIVE void myHelloWorldFunction(int argc, char **argv)
    {
        printf("MyFunction Called\n Hello World");
    }

    EMSCRIPTEN_KEEPALIVE void ComputePoints(float *oDataX, float *oDataY, float *oDataZ, int iRows, int iCols, int iTimeT)
    {
        //(21 June 2021) Temp testing to see how values can
        // be passed to JS
        // Refactor this logic to use std vectors internally
        //std::cout << "Printing inside cpp" << std::endl;
        for (int ii = 0; ii < iRows; ii++)
        {
            for (int jj = 0; jj < iCols; jj++)
            {
                oDataX[jj + ii * iCols] = (10 * (1.0 * (ii)-iRows / 2)) / (iRows);
                // oDataY[jj + ii * iCols] = 10 * 1.0 * jj / iCols;
                oDataY[jj + ii * iCols] = (10 * (1.0 * (jj)-iCols / 2)) / (iCols);

                double theta = 55 * (oDataX[jj + ii * iCols] + oDataY[jj + ii * iCols]);

                // oDataZ[jj + ii * iCols] = (oDataX[jj + ii * iCols]) * (oDataX[jj + ii * iCols]) + (oDataY[jj + ii * iCols]) * (oDataY[jj + ii * iCols]); //10 * sin(theta * PI / 180.0);
                oDataZ[jj + ii * iCols] = 10 * sin((theta - iTimeT) * PI / 180.0);
            }
        }

        // for (int ii = 0; ii < iRows; ii++)
        // {
        //     for (int jj = 0; jj < iCols; jj++)
        //     {
        //         std::cout << "X " << oDataX[jj + ii * iCols] << std::endl;
        //         std::cout << "Y " << oDataY[jj + ii * iCols] << std::endl;
        //         std::cout << "Z " << oDataZ[jj + ii * iCols] << std::endl;
        //     }
        // }
    }

    //#ifdef __cplusplus
}
//#endif