import { createEffect, createSignal } from "solid-js";
import { setView } from "../App";
import Board from "../components/Board";
import GameOverModal from "../components/GameOverModal";
import { GameViewLogo as Logo } from "../components/Icons";
import Modal from "../components/Modal";
import { Button } from "../components/UIBasics";

export const [showMenu, setShowMenu] = createSignal(false);
export const [boardKey, setBoardKey] = createSignal(0);

function GameView() {
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
            <Button
              onclick={() => {
                setView(0);
                setShowMenu(false);
              }}
              buttonType="SECONDARY"
            >
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
          onclick={() => {
            setView(0);
            setShowMenu(false);
          }}
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
