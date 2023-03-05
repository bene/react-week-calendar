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

  const minutesPerCell = 30;
  const cells = posY / cellSize.height;
  const minutes =
    Math.floor(cells) * minutesPerCell +
    Math.round((cells % 1) * minutesPerCell) +
    minutesOffset;

  return {
    dayIndex: day - 1,
    minutes,
  };
}

function floor(minutes: number, interval: number) {
  return Math.floor(minutes / interval) * interval;
}

function ceil(minutes: number, interval: number) {
  return Math.ceil(minutes / interval) * interval;
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

export { getCell, floor, ceil, convertRemToPixels, getDayOffset, classList };
