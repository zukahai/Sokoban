game_W = 0, game_H = 0;
c = 0;
data = ["6|6|111111100501121111101999141999111999"];
M = N = size = XX = YY = 0;
A = [];
im = [];
for (let i = 0; i < 6; i++) {
    im[i] = new Image();
    im[i].src = "images/" + i + ".png";
}

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
    }

    setUp(str) {
        let s = str.split("|");
        M = Math.floor(s[0]);
        N = Math.floor(s[1]);
        for (let i = 0; i < M; i++) {
            let temp = [];
            for (let j = 0; j < N; j++)
                temp[j] = s[2][i * N + j];
            A[i] = temp;
        }
        console.log(A);

        size = game_W / (N + 1);
        XX = size / 2;
        YY = (game_H - size * M) / 2;
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
        this.render();
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
}

var g = new game();