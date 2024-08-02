var Room = /** @class */ (function () {
    function Room(topWall, rightWall, bottomWall, leftWall) {
        if (topWall === void 0) { topWall = false; }
        if (rightWall === void 0) { rightWall = false; }
        if (bottomWall === void 0) { bottomWall = false; }
        if (leftWall === void 0) { leftWall = false; }
        this.topWall = topWall;
        this.rightWall = rightWall;
        this.bottomWall = bottomWall;
        this.leftWall = leftWall;
    }
    return Room;
}());
var Maze = /** @class */ (function () {
    function Maze(rows, columns) {
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
                this.maze[row][column] = new Room(isTopWall, isRightWall, isBottomWall, isLeftWall);
            }
        }
    }
    return Maze;
}());
var main_maze = new Maze(5, 5);
console.log(main_maze);
document.getElementById('helloworld').innerHTML = "New Text";
