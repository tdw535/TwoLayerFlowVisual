#include <unsupported/Eigen/FFT>

#include <iostream>
#include "FFT2DHandler.h"

std::shared_ptr<FFT2DHandler> FFT2DHandler::Create_FFT2DHandler()
{
    return std::shared_ptr<FFT2DHandler>(new FFT2DHandler());
}

//NOT CORRECT YET
// Need to fix
void FFT2DHandler::DoFFT2D(Eigen::MatrixXcd &iToFFt, Eigen::MatrixXcd &oResult)
{
    //(Could be more efficient)

    int colNums = iToFFt.cols();
    int rowNums = iToFFt.rows();

    for (int rowIdx = 0; rowIdx < rowNums; rowIdx++)
    {
        Eigen::VectorXcd tempRows(iToFFt.rows());

        mFFTProcessor.fwd(tempRows, oResult.row(rowIdx));
        oResult.row(rowIdx) = tempRows;
    }

    for (int colIdx = 0; colIdx < colNums; colIdx++)
    {
        Eigen::VectorXcd tempCols(iToFFt.cols());

        mFFTProcessor.fwd(tempCols, iToFFt.col(colIdx));
        oResult.col(colIdx) = tempCols;
    }

    std::cout << "Result of FFT of  a cos function" << std::endl;
    std::cout << oResult << std::endl;
    // for (int k = 0; k < nRows; ++k)
    // {
    //     Eigen::VectorXcf tmpOut(nCols);
    //     fft.fwd(tmpOut, matIn->row(k));
    //     matOut->row(k) = tmpOut;
    // }

    // for (int k = 0; k < matOut->cols(); ++k)
    // {
    //     Eigen::VectorXcf tmpOut(nRows);
    //     fft.fwd(tmpOut, matOut->col(k));
    //     matOut->col(k) = tmpOut;
    // }

    //Done with FFT
}

FFT2DHandler::FFT2DHandler()
{
}

FFT2DHandler::~FFT2DHandler()
{
}