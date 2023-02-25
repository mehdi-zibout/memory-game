import { config, setConfig } from "../App";

export type Config = {
  theme: "NUMBERS" | "ICONS";
  nPlayers: 1 | 2 | 3 | 4;
  gridSize: 4 | 6;
};

export const setTheme = (value: "NUMBERS" | "ICONS") =>
  setConfig((oldConfig) => ({ ...oldConfig, theme: value }));

export const setNPlayers = (value: 1 | 2 | 3 | 4) =>
  setConfig((oldConfig) => ({ ...oldConfig, nPlayers: value }));

export const setGridSize = (value: 4 | 6) =>
  setConfig((oldConfig) => ({ ...oldConfig, gridSize: value }));

export const getTheme = () => config().theme;
export const getGridSize = () => config().gridSize;
export const getNPlayers = () => config().nPlayers;
