import React, { useState, useEffect } from "react";

const NPuzzle: React.FC = () => {
  const rows = 3;
  const cols = 3;
  const totalTiles = rows * cols;
  const [tiles, setTiles] = useState<number[]>([]);
  const [emptyIndex, setEmptyIndex] = useState<number>(totalTiles - 1);

  useEffect(() => {
    initializeTiles();
  }, []);

  const initializeTiles = () => {
    const initialTiles: number[] = Array.from(
      { length: totalTiles },
      (_, i) => i + 1
    );
    initialTiles[totalTiles - 1] = 0;
    let shuffled: number[] = initialTiles.sort(() => Math.random() - 0.5);
    setTiles(shuffled);
    setEmptyIndex(shuffled.indexOf(0));
  };

  const canMove = (index: number) => {
    const clickedRow = Math.floor(index / cols);
    const clickedCol = index % cols;
    const emptyRow = Math.floor(emptyIndex / cols);
    const emptyCol = emptyIndex % cols;
    return clickedRow === emptyRow || clickedCol === emptyCol;
  };

  const handleTileClick = (index: number) => {
    if (!canMove(index)) return;

    const newTiles = [...tiles];
    const clickedRow = Math.floor(index / cols);
    const clickedCol = index % cols;
    const emptyRow = Math.floor(emptyIndex / cols);
    const emptyCol = emptyIndex % cols;

    if (clickedRow === emptyRow) {
      const direction = clickedCol < emptyCol ? 1 : -1;
      for (let col = emptyCol; col !== clickedCol; col -= direction) {
        const curr = clickedRow * cols + col;
        const next = clickedRow * cols + (col - direction);
        [newTiles[curr], newTiles[next]] = [newTiles[next], newTiles[curr]];
      }
    } else {
      const direction = clickedRow < emptyRow ? 1 : -1;
      for (let row = emptyRow; row !== clickedRow; row -= direction) {
        const curr = row * cols + clickedCol;
        const next = (row - direction) * cols + clickedCol;
        [newTiles[curr], newTiles[next]] = [newTiles[next], newTiles[curr]];
      }
    }

    setTiles(newTiles);
    setEmptyIndex(index);
  };

  const isSolved = () => {
    for (let i = 0; i < totalTiles - 1; i++) {
      if (tiles[i] !== i + 1) return false;
    }
    return true;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-16 h-16 md:w-28 md:h-28 m-1 text-xl font-bold text-center text-black rounded ${
              tile === 0 ? "bg-gray-200" : "bg-blue-300"
            }`}
            onClick={() => handleTileClick(index)}
          >
            {tile !== 0 && tile}
          </div>
        ))}
      </div>
      <button
        className="px-4 py-2 mt-4 text-white bg-black rounded font-sans"
        onClick={initializeTiles}
      >
        Slumpa
      </button>
      {isSolved() && (
        <div className="mt-4 text-green-500">Pusslet är löst!</div>
      )}
    </div>
  );
};

export default NPuzzle;
