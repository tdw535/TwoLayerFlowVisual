#include <memory>

class Solver
{
public:
    static std::shared_ptr<Solver> CreateSolver();

    void Solve();

    ~Solver();

private:
    Solver();
};