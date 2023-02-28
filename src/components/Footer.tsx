import { createEffect, createSignal, For, onCleanup, onMount } from "solid-js";
import { getNPlayers } from "../utils/game_config";
import { showMenu } from "../views/GameView";
import { isGameFinished, nMoves, scores, startCount, turn } from "./Board";
import { Score } from "./UIBasics";

export const [duration, setDuration] = createSignal(0);
function Footer() {
  if (getNPlayers() === 1) {
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
  } else {
    return (
      <div class={`grid ${getClassName()} gap-x-6 mt-6`}>
        <For each={[...Array(getNPlayers()).keys()]}>
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

function getClassName(): string {
  switch (getNPlayers()) {
    case 1:
      return "grid-cols-2";

    case 2:
      return "grid-cols-2";

    case 3:
      return "grid-cols-3";

    case 4:
      return "grid-cols-4";
  }
}
