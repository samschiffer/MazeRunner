class Room {
    topWall: boolean;
    rightWall: boolean;
    bottomWall: boolean;
    leftWall: boolean;
    roomSize: number;
    visited: boolean = false;

    constructor(roomSize: number, topWall: boolean = false, rightWall: boolean = false, bottomWall: boolean = false, leftWall: boolean = false) {
        this.roomSize= roomSize;
        this.topWall = topWall;
        this.rightWall = rightWall;
        this.bottomWall = bottomWall;
        this.leftWall = leftWall;
    }
}

class Maze {
    maze : Room[][];
    rows: number;
    columns: number;
    roomSize: number;

    constructor(rows, columns, roomSize) {
        this.roomSize = roomSize;
        this.rows = rows;
        this.columns = columns;
        this.maze = [];
        for(let row = 0; row < rows; row++) {
            this.maze[row] = [];
            for(let column = 0; column < columns; column++) {
                let isTopWall = row == 0;
                let isRightWall = column == this.columns - 1;
                let isBottomWall = row == this.columns - 1;
                let isLeftWall = column == 0;
                this.maze[row][column] = new Room(this.roomSize, isTopWall, isRightWall, isBottomWall, isLeftWall);
            }
        }
    }

    randomizeWallsForRoom(room: Room, topWall?: boolean, rightWall?: boolean, bottomWall?: boolean, leftWall?: boolean) {
        const percentWallGeneration = .25;

        room.topWall = topWall ?? Math.random() <= percentWallGeneration;
        room.rightWall = rightWall ?? Math.random() <= percentWallGeneration;
        room.bottomWall = bottomWall ?? Math.random() <= percentWallGeneration;
        room.leftWall = leftWall ?? Math.random() <= percentWallGeneration;
    }

    randomizeWallsAndDrawRoom(x: number, y: number, ctx, c, room: Room, topWall?: boolean, rightWall?: boolean, bottomWall?: boolean, leftWall?: boolean) {
        this.randomizeWallsForRoom(room, topWall, rightWall, bottomWall, leftWall);
        drawRoom(x, y, room, ctx, c);
    }

    randomizeAllWalls() {
        for(let row = 0; row < main_maze.rows; row++) {
            for(let column = 0; column < main_maze.columns; column++) {
                let isTopWall = row == 0 ? true: null;
                let isRightWall = column == this.columns - 1 ? true: null;
                let isBottomWall = row == this.rows - 1 ? true: null;
                let isLeftWall = column == 0 ? true: null;

                this.randomizeWallsForRoom(this.maze[row][column], isTopWall, isRightWall, isBottomWall, isLeftWall)
            }
        }
    }


}

function drawTop(x, y, length) {
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();
}

function clearCanvas(canvas) {
    canvas.width = 800;
}

function drawRoom(x: number, y: number, room: Room, ctx: any, c) {
    let roomSize = room.roomSize;
    // if (room.visited) {
    //     ctx.fillStyle = "red";
    //     ctx.fillRect(x + 3, y + 3, room.roomSize - 6, room.roomSize - 6);
    // }
    
    // Draw Top
    if (room.topWall){
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + roomSize, y);
        ctx.stroke();
    }

    // Draw Right 
    if (room.rightWall){
        ctx.beginPath();
        ctx.moveTo(x + roomSize, y);
        ctx.lineTo(x + roomSize, y + roomSize);
        ctx.stroke();
    }

    // Draw Bottom 
    if (room.bottomWall) {
        ctx.beginPath();
        ctx.moveTo(x, y + roomSize);
        ctx.lineTo(x + roomSize, y + roomSize);
        ctx.stroke();
    }

    // Draw Left
    if (room.leftWall) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + roomSize);
        ctx.stroke();
    }
}

function rerenderMaze(maze: Maze, canvas, context) {
    context.clearRect(0,0,canvas.width,canvas.height);
    clearCanvas(c);

    for(let row = 0; row < maze.rows; row++) {
        for(let column = 0; column < maze.columns; column++) {
            let roomX = column * maze.roomSize;
            let roomY = row * maze.roomSize;
            drawRoom(roomX, roomY, maze.maze[row][column], ctx, canvas);
        }
    }
}

var c = <HTMLCanvasElement> document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let main_maze = new Maze(20, 20, 30);
console.log(main_maze);

main_maze.randomizeAllWalls();


// Draw Rooms
for(let row = 0; row < main_maze.rows; row++) {
    for(let column = 0; column < main_maze.columns; column++) {
        let roomX = column * main_maze.roomSize;
        let roomY = row * main_maze.roomSize;
        drawRoom(roomX, roomY, main_maze.maze[row][column], ctx, c);
    }
}

// Draw a path out

let startColumn = Math.floor(Math.random() * main_maze.columns); 
debugger
let startRoom = main_maze.maze[0][startColumn]
startRoom.visited = true;
let currRow = 0;
let currColumn = startColumn;
let visited = true;
let previousMove = 2;
const visitedMap = new Map();
visitedMap.set(currRow, [currColumn]);
while (currRow < main_maze.rows) {
    ctx.fillStyle = "red";
    ctx.fillRect(currColumn * main_maze.roomSize + 2, currRow * main_maze.roomSize + 2, main_maze.roomSize - 4, main_maze.roomSize - 4);

    let moveDirection: number = Math.floor(Math.random() * 4) + 1; // 0 = up, 1 = right, 2 = down, 3 = left
    let nextRow = currRow;
    let nextColumn = currColumn;
    // let topWall, rightWall, bottomWall, leftWall = null;

    let topWall = currRow == 0 ? true: null;
    let rightWall = currColumn == main_maze.columns - 1 ? true: null;
    let bottomWall = currRow == main_maze.rows - 1 ? true: null;
    let leftWall = currColumn == 0 ? true: null;
    switch (moveDirection) {
        case(0):
            nextRow--; 
            topWall = false;
            break;
        case(1):
            nextColumn++;
            rightWall = false;
            break;
        case(2):
            nextRow++;
            bottomWall = false;
            break;
        case(3):
            nextColumn--;
            leftWall = false;
            break;
    }

    switch(previousMove){
        case(0):
            bottomWall = false;
            break;
        case(1):
            leftWall = false;
            break;
        case(2):
            topWall = false;
            break;
        case(3):
            rightWall = false;
            break;
    }


    visited = visitedMap.get(nextRow)?.includes(nextColumn); 

    if ((nextRow > -1 && nextRow <= main_maze.rows) && (nextColumn > -1 && nextColumn < main_maze.columns) && !visited) {
        
        main_maze.randomizeWallsForRoom(main_maze.maze[currRow][currColumn], topWall, rightWall, bottomWall, leftWall);
        rerenderMaze(main_maze, c, ctx);
        previousMove = moveDirection;
        currRow = nextRow;
        currColumn = nextColumn;
        if(currRow < main_maze.rows){
            main_maze.maze[currRow][currColumn].visited = true;
            if (visitedMap.get(currRow)){
                visitedMap.get(currRow).push(currColumn);
            }
            else {
                visitedMap.set(currRow, [currColumn]);
            }
        }
    }
}
