import { createSignal } from "solid-js";
import { setView } from "../App";
import { getNPlayers } from "../utils/game_config";
import { setBoardKey } from "../views/GameView";
import { nMoves } from "./Board";
import { duration } from "./Footer";
import Modal from "./Modal";
import { Button, ScoreModal } from "./UIBasics";

function GameOverModal() {
  const [isVisible, setIsVisible] = createSignal(true);
  switch (getNPlayers()) {
    case 1:
      return (
        <>
          <Modal
            cardClass="w-full max-w-[654px] text-center px-6 pt-8 pb-6"
            showModal={setIsVisible}
            isVisible={isVisible}
          >
            <h1 class="text-blue-500 text-[1.5rem]">You did it!</h1>
            <h2 class="text-blue-200 mt-[9px] mb-6 text-[0.875rem]">
              Game over! Here’s how you got on…
            </h2>
            <ScoreModal
              class="mb-2"
              value={new Date(duration()).toLocaleTimeString("fr", {
                minute: "2-digit",
                second: "2-digit",
              })}
              title="Time Elapsed"
            />
            <ScoreModal
              class="mb-6"
              value={`${nMoves()} Moves`}
              title="Moves Taken"
            />
            <Button
              buttonType="PRIMARY"
              class="w-full mb-4"
              onclick={() => {
                setBoardKey((boardkey) => boardkey + 1);
                setIsVisible(false);
              }}
            >
              Restart
            </Button>

            <Button
              buttonType="SECONDARY"
              class="w-full"
              onclick={() => {
                setView(0);
                setIsVisible(false);
              }}
            >
              setup new game
            </Button>
          </Modal>
        </>
      );

    default:
      break;
  }
  return (
    <>
      <Modal
        cardClass="w-full max-w-[654px] text-center px-6 pt-8 pb-6"
        showModal={setIsVisible}
        isVisible={isVisible}
      >
        <h1 class="text-blue-500 text-[1.5rem]">You did it!</h1>
        <h2 class="text-blue-200 mt-[9px] mb-6 text-[0.875rem]">
          Game over! Here’s how you got on…
        </h2>
        <ScoreModal class="mb-2" value="1:53" title="Time Elapsed" />
        <ScoreModal class="mb-6" value="39 Moves" title="Moves Taken" />
        <Button
          buttonType="PRIMARY"
          class="w-full mb-4"
          onclick={() => {
            setBoardKey((boardkey) => boardkey + 1);
            setIsVisible(false);
          }}
        >
          Restart
        </Button>

        <Button
          buttonType="SECONDARY"
          class="w-full"
          onclick={() => {
            setView(0);
            setIsVisible(false);
          }}
        >
          setup new game
        </Button>
      </Modal>
    </>
  );
}

export default GameOverModal;
