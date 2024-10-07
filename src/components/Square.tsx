import "./Square.scss";
import {motion} from "framer-motion";

interface SquareProps {
    onSquareClick: () => void;
    className: string;
    winning: boolean | null;
}

function Square({onSquareClick, className, winning}: SquareProps) {
    return (
        <motion.div
            initial={{scale: 0}}
            animate={{scale: 1}}
            className={winning ? "square highlight" : "square"}
            onClick={onSquareClick}  // Ensure this is correctly set
        >
            {className && (
                <motion.span
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    className={className}
                ></motion.span>
            )}
        </motion.div>
    );
}

export default Square;