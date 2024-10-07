import { useState } from 'react';

interface HistoryProps {
    history: string[][];
    currentMove: number;
    onJumpTo: (value: number) => void;
}

function findMoveLocation(currentBoard: string[], previousBoard: string[]): { row: number, col: number } | null {
    for (let i = 0; i < currentBoard.length; i++) {
        if (currentBoard[i] !== previousBoard[i]) {
            const row = Math.floor(i / 3) + 1;
            const col = (i % 3) + 1;
            return { row, col };
        }
    }
    return null; // No difference found
}

function History({ history, currentMove, onJumpTo }: HistoryProps) {
    const [isAscending, setIsAscending] = useState(true);

    const toggleSortOrder = () => {
        setIsAscending(!isAscending);
    };

    const sortedHistory = isAscending ? history : [...history].reverse();

    const moves = sortedHistory.map((squares, move) => {
        const actualMove = isAscending ? move : history.length - 1 - move;
        const previousSquares = actualMove > 0 ? history[actualMove - 1] : Array(9).fill(null);
        const moveLocation = findMoveLocation(squares, previousSquares);

        if (actualMove === currentMove) {
            return (
                <li key={actualMove}>
                    <span><b>You are at move #{actualMove} {moveLocation ? `(${moveLocation.row}, ${moveLocation.col})` : ''}</b></span>
                </li>
            );
        }

        const description = actualMove > 0 ? `Go to move #${actualMove} ${moveLocation ? `(${moveLocation.row}, ${moveLocation.col})` : ''}` : 'Go to game start';

        return (
            <li key={actualMove}>
                <button onClick={() => onJumpTo(actualMove)}>{description}</button>
            </li>
        );
    });

    return (
        <>
            <button onClick={toggleSortOrder}>
                {isAscending ? 'Sort Descending' : 'Sort Ascending'}
            </button>
            <ol>{moves}</ol>
        </>
    );
}

export default History;