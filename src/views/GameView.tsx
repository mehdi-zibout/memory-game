import { createEffect, createSignal, For } from "solid-js";
import Cell from "../components/Cell";
import { GameViewLogo as Logo } from "../components/Icons";
import { Button } from "../components/UIBasics";
import { newBoard } from "../utils/game";
import { getGridSize } from "../utils/game_config";
function GameView() {
  const gameState = newBoard();
  const [chosenCells, setChosenCells] = createSignal<{
    cells: [number | null, number | null];
    isMatch: Boolean;
  }>({ cells: [null, null], isMatch: false });
  const isChoseTwo = () =>
    chosenCells().cells[0] !== null && chosenCells().cells[1] !== null;
  const initChosenCells = () =>
    setChosenCells({ cells: [null, null], isMatch: false });
  createEffect(() => {
    if (isChoseTwo()) {
      setTimeout(
        () => {
          initChosenCells();
        },
        chosenCells().isMatch ? 100 : 600
      );
    }
  });
  return (
    <main class="p-6 flex flex-col justify-between">
      <nav class="flex justify-between items-center mb-20">
        <Logo />
        <Button buttonType="PRIMARY">menu</Button>
      </nav>
      <div
        class={`grid  ${
          getGridSize() === 4
            ? "grid-cols-4 gap-[12.29px]"
            : "grid-cols-6 gap-[9.12px]"
        }`}
      >
        <For each={gameState}>
          {(cell, index) => (
            <Cell
              index={index()}
              value={cell}
              setChosenCells={setChosenCells}
              chosenCells={chosenCells}
              gameState={gameState}
              isChoseTwo={isChoseTwo}
            />
          )}
        </For>
      </div>
    </main>
  );
}

export default GameView;
