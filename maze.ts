export class Room {
    topWall: boolean;
    rightWall: boolean;
    bottomWall: boolean;
    leftWall: boolean;

    constructor(topWall: boolean = false, rightWall: boolean = false, bottomWall: boolean = false, leftWall: boolean = false) {
        this.topWall = topWall;
        this.rightWall = rightWall;
        this.bottomWall = bottomWall;
        this.leftWall = leftWall;
    }
}

export class Maze {
    maze : Room[][];
    rows: number;
    columns: number;

    constructor(rows, columns) {
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
                this.maze[row][column] = new Room(isTopWall, isRightWall, isBottomWall, isLeftWall);
            }
        }
    }
}