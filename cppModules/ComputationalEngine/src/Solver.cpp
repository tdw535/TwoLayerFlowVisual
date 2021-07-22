#include <iostream>
#include "Solver.h"

std::shared_ptr<Solver> Solver::CreateSolver()
{
    return std::shared_ptr<Solver>(new Solver());
}

Solver::Solver()
{
}

void Solver::Solve()
{
    std::cout << "Done Solving" << std::endl;
}

Solver::~Solver()
{
}