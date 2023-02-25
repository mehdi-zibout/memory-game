import type { Component } from "solid-js";
import { Button } from "./components/UIBasics";

const App: Component = () => {
  return (
    <div class="text-h1 text-sky-300">
      Hello, World!
      <div class="p-4">
        <Button buttonType="MENUBIG">Start Game</Button>
      </div>
      <div class="p-4">
        <Button buttonType="MENUSELECT" isActive>
          Numbers
        </Button>
      </div>
      <div class="p-4">
        <Button buttonType="MENUSELECT">Numbers</Button>
      </div>
      <div class="p-4">
        <Button buttonType="PRIMARY">Restart</Button>
      </div>
      <div class="p-4">
        <Button buttonType="SECONDARY">New Game</Button>
      </div>
    </div>
  );
};

export default App;
