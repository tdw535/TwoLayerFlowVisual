#include <memory>

class Solver
{
public:
    static std::shared_ptr<Solver> CreateSolver();

    ~Solver();

private:
    Solver();
};