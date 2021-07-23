#include <iostream>

#include <Eigen/Dense>

#include "Solver.h"
#include "FFT2DHandler.h"

#include <math.h>

std::shared_ptr<Solver> Solver::CreateSolver()
{
    return std::shared_ptr<Solver>(new Solver());
}

Solver::Solver()
{
    mFFT2DHandler = FFT2DHandler::Create_FFT2DHandler();
}

void Solver::Solve()
{

    std::cout << "Applying FFT" << std::endl;

    //Take out hard coded value
    Eigen::MatrixXcd toConvert(4, 8);
    Eigen::MatrixXcd converted(4, 8);

    //Move over to a test
    double PI = 3.14189256;

    for (int rowIdx = 0; rowIdx < toConvert.rows(); rowIdx++)
    {
        for (int colIdx = 0; colIdx < toConvert.cols(); colIdx++)
        {
            double theta = (2.0 * PI * colIdx) / toConvert.cols();
            toConvert(rowIdx, colIdx) = cos(theta);
        }
    }

    std::cout << "sin function" << std::endl;
    std::cout << toConvert << std::endl;

    mFFT2DHandler->DoFFT2D(toConvert, converted);

    std::cout << "Result of doing a sin function" << std::endl;
    std::cout << converted << std::endl;

    std::cout << "Done Solving" << std::endl;
}

Solver::~Solver()
{
}