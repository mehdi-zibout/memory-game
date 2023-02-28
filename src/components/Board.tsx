import {
  createEffect,
  createSignal,
  For,
  onMount,
  Show,
  untrack,
} from "solid-js";
import { newBoard } from "../utils/game";
import { getGridSize, getNPlayers } from "../utils/game_config";
import { showMenu } from "../views/GameView";
import Cell from "./Cell";
import Footer from "./Footer";
import GameOverModal from "./GameOverModal";

export const [scores, setScores] = createSignal([0, 0, 0, 0]);
export const isGameFinished = () =>
  2 * scores().reduce((p, c) => p + c) === getGridSize() * getGridSize();
export const [nMoves, setNMoves] = createSignal(0);
export const [startCount, setStartCount] = createSignal(false);
export const [turn, setTurn] = createSignal(0);

export default function Board(key: number) {
  onMount(() => {
    setScores([0, 0, 0, 0]);
    setNMoves(0);
    setStartCount(false);
    setTurn(0);
  });
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
      untrack(() => {
        if (getNPlayers() === 1) setNMoves((moves) => moves + 1);
        if (chosenCells().isMatch) {
          const newScores = [...scores()];
          newScores[turn()] += 1;
          setScores(newScores);
        }
        setTurn((turn) => (turn + 1) % getNPlayers());
      });

      setTimeout(
        () => {
          initChosenCells();
        },
        chosenCells().isMatch ? 100 : 600
      );
    }
  });
  return (
    <>
      <Show when={isGameFinished()}>
        <GameOverModal />
      </Show>
      <div
        class={`grid w-fit mx-auto  ${
          getGridSize() === 4
            ? "grid-cols-4 gap-[12.29px] lg:gap-5"
            : "grid-cols-6 gap-[9.12px] lg:gap-4"
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
              setScores={setScores}
              scores={scores()}
              turn={turn()}
            />
          )}
        </For>
      </div>
      <Footer />
    </>
  );
}
