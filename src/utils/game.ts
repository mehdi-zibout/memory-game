import { getGridSize } from "./game_config";

const possibleValues = () => {
  const values: number[] = [];
  for (let i = 1; i <= (getGridSize() * getGridSize()) / 2; i++) {
    values.push(i, i);
  }
  return values;
};
export function newBoard() {
  const possValues = [...possibleValues()];
  const board: number[] = new Array(getGridSize() * getGridSize());
  for (let index = 0; index < board.length; index++) {
    const valueIndex = Math.floor(Math.random() * possValues.length);
    board[index] = possValues.splice(valueIndex, 1)[0];
  }
  return board;
}
