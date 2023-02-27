import {
  createComputed,
  createEffect,
  createMemo,
  createSignal,
  For,
  untrack,
} from "solid-js";
import Cell from "../components/Cell";
import Footer from "../components/Footer";
import { GameViewLogo as Logo } from "../components/Icons";
import Modal from "../components/Modal";
import { Button } from "../components/UIBasics";
import { newBoard } from "../utils/game";
import { getGridSize, getNPlayers } from "../utils/game_config";

type GameViewProps = {
  goToMainMenu: () => void;
};

const [showMenu, setShowMenu] = createSignal(false);
function GameView(props: GameViewProps) {
  createEffect(() => {
    setShowMenu(false);
  });
  const [boardKey, setBoardKey] = createSignal(0);
  return (
    <main class="p-6 md:px-10 md:pt-[37px] md:pb-[48px] lg:px-[165px] lg:pt-[67px] lg:pb-[74px] flex flex-col justify-between h-screen w-screen overflow-hidden">
      <nav class=" flex justify-between items-center">
        <Logo />
        <div class="">
          <div class="md:hidden">
            <Button onclick={() => setShowMenu(true)} buttonType="PRIMARY">
              menu
            </Button>
          </div>
          <div class="hidden md:flex gap-4">
            <Button
              onclick={() => setBoardKey((boardKey) => boardKey + 1)}
              buttonType="PRIMARY"
            >
              restart
            </Button>
            <Button onclick={props.goToMainMenu} buttonType="SECONDARY">
              new game
            </Button>
          </div>
        </div>
      </nav>
      {Board(boardKey())}

      <Modal
        cardClass="w-full p-6"
        showModal={setShowMenu}
        isVisible={showMenu}
      >
        <Button
          onclick={() => {
            setBoardKey((boardKey) => boardKey + 1);
            setShowMenu(false);
          }}
          class="block w-full my-4"
          buttonType="PRIMARY"
        >
          Restart
        </Button>
        <Button
          onclick={props.goToMainMenu}
          class="block w-full my-4"
          buttonType="SECONDARY"
        >
          new game
        </Button>
        <Button
          onclick={() => setShowMenu(false)}
          class="block w-full my-4"
          buttonType="SECONDARY"
        >
          resume game
        </Button>
      </Modal>
    </main>
  );
}

export default GameView;

function Board(key: number) {
  const gameState = newBoard();
  const [chosenCells, setChosenCells] = createSignal<{
    cells: [number | null, number | null];
    isMatch: Boolean;
  }>({ cells: [null, null], isMatch: false });
  const [startCount, setStartCount] = createSignal(false);
  const [nMoves, setNMoves] = createSignal(0);
  const [scores, setScores] = createSignal([0, 0, 0, 0]);
  const [turn, setTurn] = createSignal(0);
  const isGameFinished = () =>
    2 * scores().reduce((p, c) => p + c) === getGridSize() * getGridSize();

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
              startCount={startCount()}
              setStartCount={setStartCount}
              setScores={setScores}
              scores={scores()}
              turn={turn()}
            />
          )}
        </For>
      </div>
      <Footer
        startCount={startCount()}
        nMoves={nMoves()}
        scores={scores()}
        turn={turn()}
        isGameFinished={isGameFinished()}
        showMenu={showMenu} // TODO
      />
    </>
  );
}
