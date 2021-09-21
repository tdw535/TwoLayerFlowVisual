Problem: blocked by CORS error

Solution: Run python3 -m http.server to and open the location mentioned by the server

Reference: https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing

Problem: Couldn't get headers to be recognized by intellisense

Solution: Use soft link

e.g.

cd /usr/include

sudo ln -sf eigen3/Eigen Eigen

sudo ln -sf eigen3/unsupported unsupported

Reference: https://www.programmersought.com/article/15572875544/
