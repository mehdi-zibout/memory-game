import { For } from "solid-js";
import { setView } from "../App";
import { Logo } from "../components/Icons";
import { Button, Card } from "../components/UIBasics";
import {
  setTheme,
  setGridSize,
  setNPlayers,
  getGridSize,
  getTheme,
  getNPlayers,
} from "../utils/game_config";

function StartGame() {
  return (
    <div
      class="w-screen h-screen bg-blue-500 flex justify-center
         items-center flex-col"
    >
      <Logo fill="#fff" width={153} height={30} />
      <Card class=" p-6 md:p-14 mt-[45px] md:mt-[78px] ">
        <div class="text-blue-200 text-[0.9375rem] md:text-h3 mb-6 md:mb-8 block">
          Select Theme
          <div class="flex gap-[11px] md:gap-[30px] mt-[11px] md:mt-4">
            <Button
              type="button"
              class="w-full"
              onclick={() => setTheme("NUMBERS")}
              buttonType="MENUSELECT"
              isActive={getTheme() === "NUMBERS"}
            >
              Numbers
            </Button>
            <Button
              type="button"
              class="w-full"
              onclick={() => setTheme("ICONS")}
              buttonType="MENUSELECT"
              isActive={getTheme() === "ICONS"}
            >
              Icons
            </Button>
          </div>
        </div>
        <div class="text-blue-200 text-[0.9375rem] md:text-h3 mb-6 md:mb-8 block">
          Numbers of Players
          <ul class="flex gap-[10px]  md:gap-[30px] mt-[11px] md:mt-4">
            <For each={[1, 2, 3, 4]}>
              {(nPlayers) => (
                <li class="w-full">
                  <Button
                    onclick={() => setNPlayers(nPlayers as 1 | 2 | 3 | 4)}
                    isActive={getNPlayers() === nPlayers}
                    buttonType="MENUSELECT"
                    class="w-full"
                  >
                    {nPlayers}
                  </Button>
                </li>
              )}
            </For>
          </ul>
        </div>
        <div class="text-blue-200  text-[0.9375rem] md:text-h3 mb-6 md:mb-8 block">
          Grid Size
          <ul class="flex gap-[11px]  md:gap-[30px] mt-[11px] md:mt-4">
            <For each={[4, 6]}>
              {(gridSize) => (
                <li class="w-full">
                  <Button
                    onclick={() => setGridSize(gridSize as 4 | 6)}
                    isActive={getGridSize() === gridSize}
                    buttonType="MENUSELECT"
                    class="w-full"
                  >
                    {gridSize}
                    <span class="lowercase">x</span>
                    {gridSize}
                  </Button>
                </li>
              )}
            </For>
          </ul>
        </div>
        <Button onclick={() => setView(1)} buttonType="MENUBIG">
          Start game
        </Button>
      </Card>
    </div>
  );
}

export default StartGame;
