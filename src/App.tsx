import { Component, createSignal } from "solid-js";
import { Portal } from "solid-js/web";
import Modal from "./components/Modal";
import { Button } from "./components/UIBasics";
import { Config } from "./utils/game_config";
import GameView from "./views/GameView";
import StartGame from "./views/StartGame";

export const [config, setConfig] = createSignal<Config>({
  theme: "NUMBERS",
  nPlayers: 1,
  gridSize: 4,
});

const App: Component = () => {
  const [view, setView] = createSignal(0);
  return (
    <>
      {view() === 0 ? (
        <StartGame
          startGame={() => {
            setView(1);
          }}
        />
      ) : (
        <GameView
          goToMainMenu={() => {
            setView(0);
          }}
        />
      )}
    </>
  );
};

export default App;
