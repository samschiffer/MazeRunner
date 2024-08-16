var _a;
var Room = /** @class */ (function () {
    function Room(roomSize, topWall, rightWall, bottomWall, leftWall) {
        if (topWall === void 0) { topWall = false; }
        if (rightWall === void 0) { rightWall = false; }
        if (bottomWall === void 0) { bottomWall = false; }
        if (leftWall === void 0) { leftWall = false; }
        this.roomSize = roomSize;
        this.topWall = topWall;
        this.rightWall = rightWall;
        this.bottomWall = bottomWall;
        this.leftWall = leftWall;
    }
    return Room;
}());
var Maze = /** @class */ (function () {
    function Maze(rows, columns, roomSize) {
        this.roomSize = roomSize;
        this.rows = rows;
        this.columns = columns;
        this.maze = [];
        for (var row = 0; row < rows; row++) {
            this.maze[row] = [];
            for (var column = 0; column < columns; column++) {
                var isTopWall = row == 0;
                var isRightWall = column == this.columns - 1;
                var isBottomWall = row == this.columns - 1;
                var isLeftWall = column == 0;
                this.maze[row][column] = new Room(this.roomSize, isTopWall, isRightWall, isBottomWall, isLeftWall);
            }
        }
    }
    Maze.prototype.randomizeWallsForRoom = function (room, topWall, rightWall, bottomWall, leftWall) {
        var percentWallGeneration = .25;
        room.topWall = topWall !== null && topWall !== void 0 ? topWall : Math.random() <= percentWallGeneration;
        room.rightWall = rightWall !== null && rightWall !== void 0 ? rightWall : Math.random() <= percentWallGeneration;
        room.bottomWall = bottomWall !== null && bottomWall !== void 0 ? bottomWall : Math.random() <= percentWallGeneration;
        room.leftWall = leftWall !== null && leftWall !== void 0 ? leftWall : Math.random() <= percentWallGeneration;
    };
    Maze.prototype.randomizeAllWalls = function () {
        for (var row = 0; row < main_maze.rows; row++) {
            for (var column = 0; column < main_maze.columns; column++) {
                var isTopWall = row == 0 ? true : null;
                var isRightWall = column == this.columns - 1 ? true : null;
                var isBottomWall = row == this.columns - 1 ? true : null;
                var isLeftWall = column == 0 ? true : null;
                this.randomizeWallsForRoom(this.maze[row][column], isTopWall, isRightWall, isBottomWall, isLeftWall);
            }
        }
    };
    return Maze;
}());
function drawTop(x, y, length) {
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();
}
function drawRoom(x, y, room, ctx) {
    var roomSize = room.roomSize;
    // Draw Top
    if (room.topWall) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + roomSize, y);
        ctx.stroke();
    }
    // Draw Right 
    if (room.rightWall) {
        ctx.moveTo(x + roomSize, y);
        ctx.lineTo(x + roomSize, y + roomSize);
        ctx.stroke();
    }
    // Draw Bottom 
    if (room.bottomWall) {
        ctx.moveTo(x, y + roomSize);
        ctx.lineTo(x + roomSize, y + roomSize);
        ctx.stroke();
    }
    // Draw Left
    if (room.leftWall) {
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + roomSize);
        ctx.stroke();
    }
}
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var main_maze = new Maze(15, 15, 30);
console.log(main_maze);
main_maze.randomizeAllWalls();
// Draw Rooms
for (var row = 0; row < main_maze.rows; row++) {
    for (var column = 0; column < main_maze.columns; column++) {
        var roomX = column * main_maze.roomSize;
        var roomY = row * main_maze.roomSize;
        drawRoom(roomX, roomY, main_maze.maze[row][column], ctx);
    }
}
// Draw a path out
var startColumn = Math.floor(Math.random() * main_maze.columns);
debugger;
var startRoom = main_maze.maze[0][startColumn];
var currRow = 0;
var currColumn = startColumn;
var visited = true;
var previousMove = 2;
var visitedMap = new Map();
visitedMap.set(currRow, [currColumn]);
while (currRow < main_maze.rows) {
    ctx.fillStyle = "red";
    ctx.fillRect(currColumn * main_maze.roomSize + 2, currRow * main_maze.roomSize + 2, main_maze.roomSize - 4, main_maze.roomSize - 4);
    var moveDirection = Math.floor(Math.random() * 4) + 1; // 0 = up, 1 = right, 2 = down, 3 = left
    var nextRow = currRow;
    var nextColumn = currColumn;
    var topWall = void 0, rightWall = void 0, bottomWall = void 0, leftWall = null;
    switch (moveDirection) {
        case (0):
            nextRow--;
            topWall = false;
            break;
        case (1):
            nextColumn++;
            rightWall = false;
            break;
        case (2):
            nextRow++;
            bottomWall = false;
            break;
        case (3):
            nextColumn--;
            leftWall = false;
            break;
    }
    switch (previousMove) {
        case (0):
            bottomWall = false;
            break;
        case (1):
            leftWall = false;
            break;
        case (2):
            topWall = false;
            break;
        case (3):
            rightWall = false;
            break;
    }
    visited = (_a = visitedMap.get(nextRow)) === null || _a === void 0 ? void 0 : _a.includes(nextColumn);
    if ((nextRow > -1 && nextRow <= main_maze.rows) && (nextColumn > -1 && nextColumn < main_maze.columns) && !visited) {
        main_maze.randomizeWallsForRoom(main_maze.maze[currRow][currColumn], topWall, rightWall, bottomWall, leftWall);
        previousMove = moveDirection;
        currRow = nextRow;
        currColumn = nextColumn;
        if (visitedMap.get(currRow)) {
            visitedMap.get(currRow).push(currColumn);
        }
        else {
            visitedMap.set(currRow, [currColumn]);
        }
    }
}
