import { Cell } from "./types";

type WithOptions = {
  year?: number;
  month?: number;
  date?: number;
  hours?: number;
  minutes?: number;
  second?: number;
  milliseconds?: number;
};

function getCell(
  offset: { x: number; y: number },
  scroll: { x: number; y: number },
  cellSize: { height: number; width: number },
  daysPerWeek: number,
  hoursOffset: number,
  x: number,
  y: number
): Cell {
  const posX = x - offset.x + scroll.x;
  const posY = y - offset.y + scroll.y;

  const day = Math.ceil((posX / (cellSize.width * daysPerWeek)) * daysPerWeek);
  const hour = Math.floor(posY / (cellSize.height / 2)) / 4 + hoursOffset;

  return {
    day,
    hour,
  };
}

function copyDateWith(date: Date, opts: WithOptions) {
  const newDate = new Date(date);

  if (opts.year) {
    newDate.setFullYear(opts.year);
  }

  if (opts.month) {
    newDate.setMonth(opts.month);
  }

  if (opts.date) {
    newDate.setDate(opts.date);
  }

  if (opts.hours) {
    newDate.setHours(opts.hours);
  }

  if (opts.minutes) {
    newDate.setMinutes(opts.minutes);
  }

  if (opts.second) {
    newDate.setSeconds(opts.second);
  }

  if (opts.milliseconds) {
    newDate.setMilliseconds(opts.milliseconds);
  }

  return newDate;
}

function convertRemToPixels(rem: number) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function classList(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export { getCell, copyDateWith, convertRemToPixels, classList };
