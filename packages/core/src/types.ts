export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  onClick?: () => void;
  onDelete?: () => void;
};

export type Cell = {
  dayIndex: number;
  minutes: number;
};

export type CurrentEventState = "new" | "move" | "extendStart" | "extendEnd";
export type CurrentEvent = {
  id: string;
  state: CurrentEventState;
  offset?: number;
};
