import { Cell } from "./types";

function getCell(
  offset: { x: number; y: number },
  scroll: { x: number; y: number },
  cellSize: { height: number; width: number },
  daysPerWeek: number,
  minutesOffset: number,
  x: number,
  y: number
): Cell {
  const posX = x - offset.x + scroll.x;
  const posY = y - offset.y + scroll.y;

  const day = Math.ceil((posX / (cellSize.width * daysPerWeek)) * daysPerWeek);
  const hour = Math.floor(posY / (cellSize.height / 2)) / 4 + minutesOffset * 60;

  return {
    dayIndex: day - 1,
    hour,
  };
}

function convertRemToPixels(rem: number) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function getDayOffset(weekStartsOn: number, date: Date) {
  return (date.getDay() - weekStartsOn + 7) % 7;
}

function classList(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export { getCell, convertRemToPixels, getDayOffset, classList };
