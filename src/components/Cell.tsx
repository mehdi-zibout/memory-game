import { createEffect, createSignal, untrack } from "solid-js";
import { getGridSize, getNPlayers, getTheme } from "../utils/game_config";
import { setStartCount, startCount } from "./Board";
import {
  Flask,
  Anchor,
  Bug,
  Car,
  Futbol,
  HandSpock,
  LiraSign,
  Snowflake,
  Moon,
  Sun,
} from "./Icons";

type CellStatus = "HIDDEN" | "ACTIVE" | "FOUND";

const iconClass = "scale-50 md:scale-75 fill-white";
function GetCellTheme(props: { value: number }) {
  if (getTheme() === "ICONS") {
    switch (props.value) {
      case 1:
        return <Flask class={iconClass} />;
      case 2:
        return <Anchor class={iconClass} />;
      case 3:
        return <Bug class={iconClass} />;
      case 4:
        return <Car class={iconClass} />;
      case 5:
        return <Futbol class={iconClass} />;
      case 6:
        return <HandSpock class={iconClass} />;
      case 7:
        return <LiraSign class={iconClass} />;
      case 8:
        return <Snowflake class={iconClass} />;
      case 9:
        return <Moon class={iconClass} />;
      case 10:
        return <Sun class={iconClass} />;
      case 11:
        return <span>🛎️</span>;
      case 12:
        return <span>🥚</span>;
      case 13:
        return <span>🥸</span>;
      case 14:
        return <span>🤓</span>;
      case 15:
        return <span>🤥</span>;
      case 16:
        return <span>💀</span>;
      case 17:
        return <span>🎈</span>;
      case 18:
        return <span>🥐</span>;
    }
  }
  return <>{props.value}</>;
}
const size = () =>
  getGridSize() === 4
    ? "w-[72.53px] h-[72.53px] md:w-[118px] md:h-[118px] md:text-number4x4  text-[2.5rem]"
    : "w-[46.88px] h-[46.88px] md:w-[82px] md:h-[82px] md:text-number6x6 text-[1.5rem]";

function Cell(props) {
  const [status, setStatus] = createSignal<CellStatus>("HIDDEN");
  const bgColor = () => {
    switch (status()) {
      case "ACTIVE":
        return "bg-orange";
      case "FOUND":
        return "bg-blue-100";
      case "HIDDEN":
        return "bg-blue-400";
    }
  };
  const handleOnClick = () => {
    if (getNPlayers() === 1 && !startCount()) setStartCount(true);
    setStatus("ACTIVE");
    props.setChosenCells(
      props.chosenCells().cells[0] !== null
        ? {
            cells: [props.chosenCells().cells[0], props.index],
            isMatch:
              props.gameState[props.chosenCells().cells[0]] === props.value,
          }
        : { cells: [props.index, null], isMatch: false }
    );
  };

  createEffect(() => {
    if (props.chosenCells().cells.includes(props.index)) {
      if (props.chosenCells().isMatch) {
        setStatus("FOUND");
      } else {
        setStatus("ACTIVE");
      }
    } else if (status() !== "FOUND") {
      setStatus("HIDDEN");
    }
  });
  return (
    <button
      disabled={status() !== "HIDDEN" || props.isChoseTwo()}
      onclick={handleOnClick}
      class={`${size()} ${bgColor()} rounded-full flex justify-center items-center text-white transition duration-500`}
    >
      {status() !== "HIDDEN" && <GetCellTheme value={props.value} />}
    </button>
  );
}

export default Cell;
