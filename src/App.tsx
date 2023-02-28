import { Component, createSignal } from "solid-js";
import { Portal } from "solid-js/web";
import GameOverModal from "./components/GameOverModal";
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

export const [view, setView] = createSignal(0);
const App: Component = () => {
  return <>{view() === 0 ? <StartGame /> : <GameView />}</>;
};

export default App;
