const matrix = document.querySelector(".matrix");
const run = document.querySelector(".run");
const reset = document.querySelector(".reset");
const refresh = document.querySelector(".refresh");

const algo = document.querySelector("[name='algo']");

let algorithm = "bfs";

const active = "#000";
const inactive = "#aaa";
const visited = "#330066";

function wait() {
    let time = 0;
    console.log("usao?");
    while (time < 10000000) time++;
}

class Cell {
    constructor () {
        this.self = document.createElement("div");
        this.self.classList.add("cell");
        this.self = matrix.appendChild(this.self);

        this.color = this.color.bind(this);
    }

    color (clr) {
        this.self.style.background = clr;
    }

    hide () {
        this.self.style.display = "none";
    }

    show () {
        this.self.style.display = "inline-block";
    }
}


class Matrix {

    constructor () {
        // this.width = 30;
        // this.height = height;
        this.dx = [1, 0,-1, 0];
        this.dy = [0, 1, 0,-1];

        this.matrix = [];
        this.matra = [];

        this.found = false;

        for (let i = 0; i <= 16; ++i) {
            this.matrix[i] = [];
            for (let j = 1; j <= 30; ++j) {
                this.matrix[i][j] = 0;
            }
        }
        // Setting top and bottom edge.
        for (let i = 0; i < 32; ++i) {
            this.matrix[ 0][i] = 1;
            this.matrix[16][i] = 1;
        }
        // Setting left and right edge.
        for (let i = 0; i < 16; ++i) {
            this.matrix[i][ 0] = 1;
            this.matrix[i][31] = 1;
        }

        console.log(this.matrix);

        this.bfs = this.bfs.bind(this);
        this.reset = this.reset.bind(this);
        this.solve = this.solve.bind(this);
        this.refresh = this.refresh.bind(this);

        for (let i = 1; i <= 15; ++i) {
            this.matra[i] = []
            for (let j = 1; j <= 30; ++j) {
                this.matra[i][j] = new Cell();
                this.matra[i][j].self.addEventListener("click", () => {
                    if (this.matrix[i][j] == 0) {
                        this.matra[i][j].color(active);
                        this.matrix[i][j] = 1;
                    }
                    else {
                        this.matra[i][j].color(inactive);
                        this.matrix[i][j] = 0;
                    }
                });
            }
        }

    }

    async bfs () {
        let t = 25;

        const qx = [];
        const qy = [];

        qx.push(1);
        qy.push(15);

        this.matrix[1][15] = 2;
        this.matra[1][15].color(visited);

        while (qx.length) {
            if (qx[0] === 15 && qy[0] === 15) {
                return;
            }
            console.log("Tren:", qx[0], qy[0]);
            for (let kuda = 0; kuda < 4; ++kuda) {
                if (this.matrix[qx[0] + this.dx[kuda]][qy[0] + this.dy[kuda]] == 0) {
                    qx.push(qx[0] + this.dx[kuda]);
                    qy.push(qy[0] + this.dy[kuda]);

                    console.log("Idem na:", qx[0] + this.dx[kuda], qy[0] + this.dy[kuda]);
                    
                    console.log("vamo al ne boja");
                    this.matrix[qx[0] + this.dx[kuda]][qy[0] + this.dy[kuda]] = 2;
                    this.matra[qx[0] + this.dx[kuda]][qy[0] + this.dy[kuda]].self.style.transition = `background 250ms ease-in-out ${t}ms`;
                    this.matra[qx[0] + this.dx[kuda]][qy[0] + this.dy[kuda]].color(visited);
                    t += 25;
                }
            }
            qx.shift();
            qy.shift();
            // await wait();
            console.log("woop");
        }
    }

    dfs (x, y, t) {
        this.matrix[x][y] = 2;
        this.matra[x][y].self.style.transition = `background 250ms ease-in-out ${t}ms`;
        this.matra[x][y].color(visited);

        if (x === 15 && y === 15) {
            this.found = true;
            return;
        }

        for (let kuda = 0; kuda < 4; ++kuda) {
            if (this.matrix[x + this.dx[kuda]][y + this.dy[kuda]] === 0) {
                // wait();
                this.dfs(x + this.dx[kuda], y + this.dy[kuda], t + 25);
                if (this.found) {
                    return;
                }
            }
        }

        // this.matra[x][y].self.style.transition = `background 250ms ease-in-out ${t + 25}ms`;
        // this.matra[x][y].color(inactive);
    }

    reset() {
        this.found = false;
        for (let i = 1; i <= 15; ++i) {
            for (let j = 1; j <= 30; ++j) {
                this.matrix[i][j] = 0;
                this.matra[i][j].self.style.transition = "background 250ms ease-in-out";
                this.matra[i][j].color(inactive);
            }
        }
    }

    refresh () {
        this.found = false;
        for (let i = 1; i <= 15; ++i) {
            for (let j = 1; j <= 30; ++j) {
                if (this.matrix[i][j] === 2) {
                    this.matrix[i][j] = 0;
                    this.matra[i][j].self.style.transition = "background 250ms ease-in-out";    
                    this.matra[i][j].color(inactive);
                }
            }
        }
    }

    solve (algorithm) {
        if (algorithm === "bfs") {
            this.bfs();
        }
        else if (algorithm == "dfs") {
            this.dfs(1, 15, 25);
        }
    }
}

const matrica = new Matrix();


run.addEventListener("click", () => {
    console.log("solvin...");
    matrica.solve(algorithm);
});

reset.addEventListener("click", () => {
    console.log("resetin...");
    matrica.reset();
});

refresh.addEventListener("click", () => {
    matrica.refresh();
});

algo.addEventListener("change", (event) => {
    console.log("promenio algo");

    algorithm = event.target.value;
    matrica.refresh();
    console.log(algorithm);
});
