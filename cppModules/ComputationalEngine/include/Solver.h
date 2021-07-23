#include <memory>

class FFT2DHandler;

class Solver
{
public:
    static std::shared_ptr<Solver> CreateSolver();

    void Solve();

    ~Solver();

private:
    std::shared_ptr<FFT2DHandler> mFFT2DHandler;
    Solver();
};