var UNASSIGNED = 0;

var puzzle =
    [
        [0,0,4,0,1,0,9,7,0],
        [2,0,5,0,8,0,3,0,0],
        [7,1,0,0,0,3,0,2,0],
        [0,7,6,0,0,9,1,4,0],
        [5,0,0,0,0,0,0,0,6],
        [0,4,1,8,0,0,2,5,0],
        [0,3,0,1,0,0,0,8,5],
        [0,0,9,0,5,0,7,0,2],
        [0,5,2,0,7,0,6,0,0]
    ];

function solve(puzzle) {
    // TODO check for valid puzzle

    var location = {
        row: 0,
        col: 0
    };

    if(!findNextLocation(puzzle, location)) {
        return true; // No more unassigned locations, must be solved
    }

    console.log("location", location);

    for(var num = 1; num <= 9; num++) {
        if(noConflicts(puzzle, location, num)) {  // Check for conflicts
            puzzle[location.row][location.col] = num;  // No conflicts, assign num and try to solve the rest of the puzzle

            if(solve(puzzle)) {
                // Solved!
                return true;
            }

            // Solution not valid
            // Backtrack and try a different number
            puzzle[location.row][location.col] = UNASSIGNED;
        }
    }
    return false;
}

function findNextLocation(puzzle, location) {
    for(var i = 0; i < puzzle.length; i++) {
        var row = puzzle[i];

        for(var j = 0; j < row.length; j++) {
            if(row[j] === 0) {
                location.row = i;
                location.col = j;
                return true;
            }
        }
    }
    return false;
}

function noConflicts(puzzle, location, num) {
    return checkRow(puzzle, location.row, num) &&
        checkCol(puzzle, location.col, num) &&
        checkSq(puzzle, location.row, location.col, num);
}

function checkRow(puzzle, row, num) {
    for(var i = 0; i < 9; i ++) {
        if(puzzle[row][i] === num) {
            return false;
        }
    }
    return true;
}

function checkCol(puzzle, col, num) {
    for(var i = 0; i < 9; i ++) {
        if(puzzle[i][col] === num) {
            return false;
        }
    }
    return true;
}

function checkSq(puzzle, row, col, num) {
    for(var i = row - (row % 3); i < 3; i++) {
        for(var j = col - (col % 3); j < 3; j++) {
            if(puzzle[i][j] === num) {
                return false;
            }
        }
    }
    return true;
}

var solved = solve(puzzle);
console.log(solved, puzzle);

