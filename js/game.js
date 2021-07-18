game_W = 0, game_H = 0;
c = 0;
data = ["6|6|111111100501121111101999141999111999"];
M = N = size = XX = YY = xPanda = yPanda = -1;
A = [];
im = [];
for (let i = 0; i < 7; i++) {
    im[i] = new Image();
    im[i].src = "images/" + i + ".png";
}
count = countWin = -1;

class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
    }

    init() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.render();
        this.setUp(data[0]);
        this.loop();

        this.listenMouse();
        this.listenKeyboard();
    }

    setUp(str) {
        let s = str.split("|");
        M = Math.floor(s[0]);
        N = Math.floor(s[1]);
        for (let i = 0; i < M; i++) {
            let temp = [];
            for (let j = 0; j < N; j++) {
                temp[j] = s[2][i * N + j];
                if (temp[j] == 5) {
                    xPanda = i;
                    yPanda = j;
                }
            }
                
            A[i] = temp;
        }
        console.log(A);

        size = game_W / (N + 1);
        XX = size / 2;
        YY = (game_H - size * M) / 2;
    }

    movePanda(dx, dy) {
        if (!this.isPoint(xPanda + dx, yPanda + dy))
            return;
        if (A[xPanda + dx][yPanda + dy] == 0) {
            A[xPanda][yPanda] = (A[xPanda][yPanda] == 5) ? 0 : 4;
            A[xPanda + dx][yPanda + dy] = 5;
            xPanda += dx;
            yPanda += dy;
        } if (A[xPanda + dx][yPanda + dy] == 4) {
            A[xPanda][yPanda] = (A[xPanda][yPanda] == 5) ? 0 : 4;
            A[xPanda + dx][yPanda + dy] = 6;
            xPanda += dx;
            yPanda += dy;
        } else if (A[xPanda + dx][yPanda + dy] == 2) {
            if (this.isPoint(xPanda + 2 * dx, yPanda + 2 * dy)) {
                if (A[xPanda + 2 * dx][yPanda + 2 * dy] == 0) {
                    A[xPanda + 2 * dx][yPanda + 2 * dy] = 2;
                    A[xPanda + dx][yPanda + dy] = 5;
                    A[xPanda][yPanda] = (A[xPanda][yPanda] == 5) ? 0 : 4;
                    xPanda += dx;
                    yPanda += dy;
                } else if (A[xPanda + 2 * dx][yPanda + 2 * dy] == 4) {
                    A[xPanda + 2 * dx][yPanda + 2 * dy] = 3;
                    A[xPanda + dx][yPanda + dy] = 5;
                    A[xPanda][yPanda] = (A[xPanda][yPanda] == 5) ? 0 : 4;
                    xPanda += dx;
                    yPanda += dy;
                }
            }
        } else if (A[xPanda + dx][yPanda + dy] == 3) {
            if (this.isPoint(xPanda + 2 * dx, yPanda + 2 * dy)) {
                if (A[xPanda + 2 * dx][yPanda + 2 * dy] == 0) {
                    A[xPanda][yPanda] = (A[xPanda][yPanda] == 5) ? 0 : 4;
                    A[xPanda + dx][yPanda + dy] = 6;
                    A[xPanda + 2 * dx][yPanda + 2 * dy] = 2;
                    xPanda += dx;
                    yPanda += dy;
                } else  if (A[xPanda + 2 * dx][yPanda + 2 * dy] == 4){
                    if (A[xPanda + 2 * dx][yPanda + 2 * dy] == 4) {
                        A[xPanda][yPanda] = (A[xPanda][yPanda] == 5) ? 0 : 4;
                        A[xPanda + dx][yPanda + dy] = 6;
                        A[xPanda + 2 * dx][yPanda + 2 * dy] = 3;
                        xPanda += dx;
                        yPanda += dy;
                    }
                }
            }
        }
    }

    checkWin() {
        for (let i = 0; i < M; i++)
            for (let j = 0; j < N; j++)
                if (A[i][j] == 4 || A[i][j] == 6)
                    return false;
        return true;
    }

    listenKeyboard() {
        document.addEventListener("keydown", key => {
            switch(key.keyCode) {
                case 37:
                case 65:
                    // console.log("Left");
                    this.movePanda(0, -1);
                    break;
                
                case 38:
                case 87:
                    // console.log("Top");
                    this.movePanda(-1, 0);
                    break;

                case 39:
                case 68:
                    // console.log("Right");
                    this.movePanda(0, 1);
                    break;

                case 40:
                case 83:
                    // console.log("Bottom");
                    this.movePanda(1, 0);
                    break;
            }
        })
    }

    listenMouse() {
        document.addEventListener("mousedown", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
        })

        document.addEventListener("mousemove", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
        })

        document.addEventListener("mouseup", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
        })
    }


    loop() {
        this.update();
        this.draw();
        setTimeout(() => {
            this.loop();
        }, 30);
    }

    update() {
        count++;
        this.render();
        if (this.checkWin() && countWin == -1) {
            countWin = count + 10;
        }

        if (this.checkWin() && countWin == count) {
            window.alert("Next");
        }
    }

 
    render() {
        if (game_W * c != document.documentElement.clientWidth || game_H != document.documentElement.clientHeight) {
            this.canvas.width = document.documentElement.clientWidth;
            this.canvas.height = document.documentElement.clientHeight;
            if (this.canvas.width > this.canvas.height)
                this.canvas.width = this.canvas.height
            c = document.documentElement.clientWidth / this.canvas.width;
            game_W = this.canvas.width;
            game_H = this.canvas.height;
        }
    }

    draw() {
        this.clearScreen();
        this.drawMatrix();
    }

    drawMatrix(){
        for (let i = 0; i < M; i++) 
            for (let j = 0; j < N; j++)
                if (A[i][j] != 9)
                    this.context.drawImage(im[A[i][j]], XX + j * size, YY + i * size, size + 1, size + 1);
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        this.context.fillStyle = '#000000';
        this.context.fillRect(0 , 0, game_W, game_H); 
    }

    getWidth() {
        var area = game_W * game_H;
        return Math.sqrt(area / 300);
    }

    isPoint(x, y) {
        if (x < 0 || y < 0 || x >= M || y >= N)
            return false;
        return true;
    }
}

var g = new game();