import { Component, createSignal } from "solid-js";
import { Config } from "./utils/game_config";
import GameView from "./views/GameView";
import StartGame from "./views/StartGame";

export const [config, setConfig] = createSignal<Config>({
  theme: "ICONS",
  nPlayers: 1,
  gridSize: 4,
});

const App: Component = () => {
  return (
    // <div class="text-h1 text-sky-300">
    //   Hello, World!
    //   <div class="p-4">
    //     <Button buttonType="MENUBIG">Start Game</Button>
    //   </div>
    //   <div class="p-4">
    //     <Button buttonType="MENUSELECT" isActive>
    //       Numbers
    //     </Button>
    //   </div>
    //   <div class="p-4">
    //     <Button buttonType="MENUSELECT">Numbers</Button>
    //   </div>
    //   <div class="p-4">
    //     <Button buttonType="PRIMARY">Restart</Button>
    //   </div>
    //   <div class="p-4">
    //     <Button buttonType="SECONDARY">New Game</Button>
    //   </div>
    // </div>
    // <StartGame />
    <GameView />
  );
};

export default App;
