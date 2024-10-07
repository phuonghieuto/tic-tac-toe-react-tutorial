import Square from "./Square.tsx";

interface BoardProps {
    xIsNext: boolean | null;
    squares: string[];
    onPlay: (value: string[]) => void;
    checkWinner: (squares: string[]) => string | null;
    winningLine: number[] | null;
}

function Board({xIsNext, squares, onPlay, checkWinner, winningLine}: BoardProps) {
    function handleClick(i: number) {
        if (checkWinner(squares)|| squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "x";
        } else {
            nextSquares[i] = "o";
        }
        onPlay(nextSquares);
    }

    const renderSquare = (i: number) => (
        <Square
            key={i}
            onSquareClick={() => handleClick(i)}  // Ensure this is correctly set
            className={squares[i] || ''}
            winning={winningLine && winningLine.includes(i)}
        />
    );

    const boardRows = [];
    for (let row = 0; row < 3; row++) {
        const squares = [];
        for (let col = 0; col < 3; col++) {
            squares.push(renderSquare(row * 3 + col));
        }
        boardRows.push(
            <div
                key={row}
                className="board-row">
                {squares}
            </div>
        );
    }

    return (
        <>
            {boardRows}
        </>
    );
}

export default Board;