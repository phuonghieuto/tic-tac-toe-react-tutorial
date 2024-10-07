import {useState} from 'react';
import Board from "./components/Board.tsx";
import Button from "./components/Button.tsx";
import Square from "./components/Square.tsx";
import {motion} from "framer-motion";
import History from "./components/History.tsx";

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [winner, setWinner] = useState<string | null>(null);
    const [winningLine, setWinningLine] = useState<number[] | null>(null);
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    function handlePlay(nextSquares: string[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        const {winner, line} = calculateWinner(nextSquares);
        setWinner(winner);
        setWinningLine(line);
    }

    function handleCheckWinner(squares: string[]) {
        const x = calculateWinner(squares);
        return x.winner;
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
        const {winner, line} = calculateWinner(history[nextMove]);
        setWinner(winner);
        setWinningLine(line);
    }

    const resetGame = () => {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setWinner(null);
        setWinningLine(null);
    };

    return (
        <div className="tic-tac-toe">
            <h1> TIC-TAC-TOE </h1>
            <Button resetGame={resetGame} />
            <div className="game">
                <div className="winner-announcement">
                    {winner &&
                        <motion.div
                            key={"child-box"}
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            exit={{scale: 0, opacity: 0}}
                            className="text"
                        >
                            <motion.h2
                                initial={{scale: 0, y: 100}}
                                animate={{
                                    scale: 1,
                                    y: 0,
                                    transition: {
                                        y: {delay: 0.7},
                                        duration: 0.7,
                                    },
                                }}
                            >
                                {winner === "draw"
                                    ? "No Winner :/"
                                    : "Win !! :)"}
                            </motion.h2>
                            <motion.div
                                initial={{scale: 0}}
                                animate={{
                                    scale: 1,
                                    transition: {
                                        delay: 1.3,
                                        duration: 0.2,
                                    },
                                }}
                                className="win"
                            >
                                {winner === "draw" ? (
                                    <>
                                        <Square
                                            className="x"
                                            onSquareClick={() => {}}  winning={false}/>
                                        <Square
                                            className="o"
                                            onSquareClick={() => {}}  winning={false}/>
                                    </>
                                ) : (
                                    <>
                                        <Square
                                            className={winner}
                                            onSquareClick={() => {}}  winning={false}/>
                                    </>
                                )}
                            </motion.div>
                        </motion.div>
                    }
                </div>
                <div className = "board">
                    <Board
                        xIsNext = {xIsNext}
                        squares = {currentSquares}
                        onPlay = {handlePlay}
                        checkWinner = {handleCheckWinner}
                        winningLine = {winningLine}
                    />
                    <div className = {`turn ${xIsNext ? "left" : "right"}`}>
                        <Square
                            className = "x"
                            onSquareClick = {() => {
                            }}
                            winning={false}/>
                        <Square
                            className = "o"
                            onSquareClick = {() => {
                            }}
                            winning={false}/>
                    </div>
                </div>
                <div className = "history">
                    <History
                        history = {history}
                        currentMove = {currentMove}
                        onJumpTo = {jumpTo} />
                </div>
            </div>

        </div>
    );
}

function calculateWinner(squares: string[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {winner: squares[a], line: [a, b, c]};
        }
    }
    if (squares.every(square => square !== null)) {
        return {winner: "draw", line: []};
    }
    return {winner: null, line: []};
}

export default Game;