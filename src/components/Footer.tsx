import { createSignal } from "solid-js";
import { getNPlayers } from "../utils/game_config";
import { Score } from "./UIBasics";

function Footer(props) {
  switch (getNPlayers()) {
    case 1:
      const [duration, setDuration] = createSignal(0);
      setInterval(() => {
        if (props.startCount) setDuration((duration) => duration + 1000);
      }, 1000);
      return (
        <div class="grid grid-cols-2 gap-x-6 mt-6">
          <Score
            title="Time"
            value={new Date(duration()).toLocaleTimeString("fr", {
              minute: "2-digit",
              second: "2-digit",
            })}
          />
          <Score title="Moves" value={props.nMoves} />
        </div>
      );
    case 2:
      return (
        <div class="grid grid-cols-2 gap-x-6 mt-6">
          <Score title="P1" value="4" />
          <Score isActive title="P2" value="4" />
        </div>
      );
    case 3:
      return (
        <div class="grid grid-cols-3 gap-x-6 mt-6">
          <Score title="P1" value="4" />
          <Score isActive title="P2" value="4" />
          <Score title="P3" value="2" />
        </div>
      );
    case 4:
      return (
        <div class="grid grid-cols-4 gap-x-6 mt-6">
          <Score title="P1" value="4" />
          <Score isActive title="P2" value="4" />
          <Score title="P3" value="2" />
          <Score title="P4" value="0" />
        </div>
      );
  }
}

export default Footer;
