import React, { Fragment, useEffect, useRef, useState } from "react";

import CalendarEventView from "./CalendarEventView";
import CalendarTimeScale from "./CalendarTimeScale";
import CalendarWeekdayNames from "./CalendarWeekdayNames";
import CalendarWeekScale from "./CalendarWeekScale";
import useElementSize from "./useComponentSize";
import { convertRemToPixels, copyDateWith, getCell } from "./utils";

type CalendarProps = {
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  cellHeight?: number;
  scrollToCurrentTime?: boolean;
};

type CurrentEvent = {
  id: string;
  isNew: boolean;
};

const defaultCellHeight = convertRemToPixels(3);

function Calendar({
  events,
  setEvents,
  cellHeight = defaultCellHeight,
  scrollToCurrentTime = false,
}: CalendarProps) {
  const [weekStart, setWeekStart] = useState(new Date(2023, 0, 2));
  const [currentEvent, setCurrentEvent] = useState<CurrentEvent | null>(null);
  const [cell, setCell] = useState<Cell | null>(null);

  const containerEl = useRef<HTMLDivElement | null>(null);
  const eventsGridEl = useRef<HTMLOListElement | null>(null);
  const cellWidthMeasurementEl = useRef<HTMLDivElement | null>(null);
  const cellSize = useElementSize(cellWidthMeasurementEl);

  useEffect(() => {
    if (containerEl.current && scrollToCurrentTime) {
      const currentMinute = new Date().getHours() * 60;
      containerEl.current.scrollTop =
        (containerEl.current.scrollHeight * currentMinute) / 1440;
    }
  }, [containerEl.current]);

  const onMouseDown = (e: React.MouseEvent<HTMLOListElement>) => {
    if (e.button !== 0 || e.target !== eventsGridEl.current || !cell) {
      return;
    }

    const hours = Math.floor(cell.hour);
    const minutes = (cell.hour % 1) * 60;

    const start = copyDateWith(weekStart, {
      date: weekStart.getDate() + (cell.day - 1),
      hours,
      minutes,
    });

    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      title: "New Event",
      start: new Date(start),
      end: copyDateWith(start, { minutes: 30 }),
    };

    setEvents([...events, newEvent]);
    setCurrentEvent({ id: newEvent.id, isNew: true });
  };

  const onMouseUp = () => {
    if (currentEvent) {
      setCurrentEvent(null);
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLOListElement>) => {
    if (!(cellSize && containerEl.current)) {
      return;
    }

    const cell = getCell(
      {
        x:
          window.scrollX +
          containerEl.current.scrollLeft -
          convertRemToPixels(3.5), // CalendarTimeScale on left has width of 3.5rem
        y: window.scrollY + containerEl.current.scrollTop - (48 + cellHeight), // CalendarWeekdayNames + Spacer on top has height of 48px
      },
      {
        width: cellSize.width,
        height: cellHeight,
      },
      e.clientX,
      e.clientY
    );
    setCell(cell);

    if (!currentEvent) {
      return;
    }

    setEvents(
      events.map((event) => {
        if (event.id === currentEvent.id) {
          return {
            ...event,
            start: currentEvent.isNew
              ? event.start
              : copyDateWith(event.start, {
                  hours: Math.floor(cell.hour),
                  minutes: (cell.hour % 1) * 60,
                }),
            end: copyDateWith(event.end, {
              hours: Math.floor(cell.hour),
              minutes: (cell.hour % 1) * 60 + 30,
            }),
          };
        }

        return event;
      })
    );
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <>
      <div className="flex h-full flex-col">
        <div
          ref={containerEl}
          className="scroll-smooth select-none isolate flex flex-auto flex-col overflow-auto bg-white"
        >
          <div
            style={{ width: "165%" }}
            className="flex max-w-full flex-none flex-col"
          >
            <CalendarWeekdayNames />

            <div className="flex flex-auto">
              <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
              <div className="grid flex-auto grid-cols-1 grid-rows-1">
                {/* Horizontal lines */}
                <CalendarTimeScale cellHeight={cellHeight} />

                {/* Vertical lines */}
                <CalendarWeekScale
                  cellWidthMeasurementElement={cellWidthMeasurementEl}
                />

                {/* Events */}
                <ol
                  ref={eventsGridEl}
                  onMouseDown={onMouseDown}
                  onMouseUp={onMouseUp}
                  onMouseMove={onMouseMove}
                  className="cursor-grab col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7"
                  style={{
                    gridTemplateRows:
                      "1.75rem repeat(288, minmax(0, 1fr)) auto",
                  }}
                >
                  {events.map((event) => (
                    <Fragment key={event.id}>
                      <CalendarEventView
                        event={event}
                        isDragged={currentEvent?.id === event.id}
                        onDelete={() => deleteEvent(event.id)}
                      />
                    </Fragment>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Calendar;
