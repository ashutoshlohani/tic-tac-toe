const Board = () => {
   const [squares, setSquares] = React.useState(Array(9).fill(null));

   const nextValue = calculateNextValue(squares);
   const winner = calculateWinner(squares);
   const status = calculateStatus(winner, squares, nextValue);

   function renderSquare(i) {
      return (
         <button className='square' onClick={() => selectSquare(i)}>
            {squares[i]}
         </button>
      );
   }

   function selectSquare(i) {
      if (winner || squares[i]) {
         return;
      }

      const squaresCopy = [...squares];
      squaresCopy[i] = nextValue;
      setSquares(squaresCopy);
   }

   function restart() {
      setSquares(Array(9).fill(null));
   }

   return (
      <>
         <div className='status'>{status}</div>
         <div className='grid'>
            <div className='firstRow'>
               <div className='b1 box'>{renderSquare(0)}</div>
               <div className='b2 box'>{renderSquare(1)}</div>
               <div className='b3 box'>{renderSquare(2)}</div>
            </div>
            <div className='secondRow'>
               <div className='b4 box'>{renderSquare(3)}</div>
               <div className='b5 box'>{renderSquare(4)}</div>
               <div className='b6 box'>{renderSquare(5)}</div>
            </div>
            <div className='thirdRow'>
               <div className='b7 box'>{renderSquare(6)}</div>
               <div className='b8 box'>{renderSquare(7)}</div>
               <div className='b9 box'>{renderSquare(8)}</div>
            </div>
         </div>
         <div className='restart' onClick={restart}>
            ↻
         </div>
      </>
   );
};

function calculateNextValue(squares) {
   return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

function calculateStatus(winner, squares, nextValue) {
   return winner
      ? `WINNER:${winner}`
      : squares.every(Boolean)
      ? `DRAW!`
      : `NEXT PLAYER: ${nextValue}`;
}

function calculateWinner(squares) {
   const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
   ];
   for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
         return squares[a];
      }
   }
   return null;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Board />);
