import {
  createEffect,
  createSignal,
  For,
  on,
  onCleanup,
  onMount,
} from "solid-js";
import { getNPlayers } from "../utils/game_config";
import { showMenu } from "../views/GameView";
import { isGameFinished, nMoves, scores, startCount, turn } from "./Board";
import { Score } from "./UIBasics";

export const [duration, setDuration] = createSignal(0);
function Footer() {
  switch (getNPlayers()) {
    case 1:
      onMount(() => {
        setDuration(0);
      });
      onCleanup(() => {
        setInterval(() => clearInterval(timer));
      });
      const timer = setInterval(() => {
        if (startCount() && !showMenu())
          setDuration((duration) => duration + 1000);
      }, 1000);

      createEffect(() => {
        if (isGameFinished()) clearInterval(timer);
      });

      return (
        <div class="grid grid-cols-2 gap-x-6 mt-6 w-full md:w-[550px] mx-auto">
          <Score
            title="Time"
            value={new Date(duration()).toLocaleTimeString("fr", {
              minute: "2-digit",
              second: "2-digit",
            })}
          />
          <Score title="Moves" value={nMoves()} />
        </div>
      );
    case 2:
      return (
        <div class="grid grid-cols-2 gap-x-6 mt-6">
          <For each={[0, 1]}>
            {(i) => (
              <Score
                isActive={i === turn()}
                title={`Player ${i + 1}`}
                value={scores()[i]}
              />
            )}
          </For>
        </div>
      );
    case 3:
      return (
        <div class="grid grid-cols-3 gap-x-6 mt-6">
          <For each={[0, 1, 2]}>
            {(i) => (
              <Score
                isActive={i === turn()}
                title={`Player ${i + 1}`}
                value={scores()[i]}
              />
            )}
          </For>
        </div>
      );
    case 4:
      return (
        <div class="grid grid-cols-4 gap-x-6 mt-6">
          <For each={[0, 1, 2, 3]}>
            {(i) => (
              <Score
                isActive={i === turn()}
                title={`Player ${i + 1}`}
                value={scores()[i]}
              />
            )}
          </For>
        </div>
      );
  }
}

export default Footer;
