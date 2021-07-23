
// 22 July 2021
// If we need speed, replace the eigen with FFTW
#include <unsupported/Eigen/FFT>
#include <memory>

class FFT2DHandler
{
public:
    static std::shared_ptr<FFT2DHandler> Create_FFT2DHandler();

    void DoFFT2D(Eigen::MatrixXcd &iToFFt, Eigen::MatrixXcd &oResult);

    ~FFT2DHandler();

private:
    Eigen::FFT<double> mFFTProcessor;

    FFT2DHandler();
};