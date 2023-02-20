import React, { Fragment, useEffect, useRef, useState } from "react";

import CalendarEventView from "./CalendarEventView";
import CalendarTimeScale from "./CalendarTimeScale";
import CalendarWeekdayNames from "./CalendarWeekdayNames";
import CalendarWeekScale from "./CalendarWeekScale";
import useElementSize from "./useElementSize";
import useElementOffset from "./useElementOffset";
import { CalendarEvent } from "./types";
import { classList, convertRemToPixels, copyDateWith, getCell } from "./utils";

const _twInclude = [
  "h-screen",
  "w-screen",
  "grid-cols-1",
  "grid-cols-2",
  "grid-cols-3",
  "grid-cols-4",
  "grid-cols-5",
  "grid-cols-6",
  "grid-cols-7",
];

type CalendarProps<T> = {
  startDate: Date;
  daysPerWeek?: number;
  hoursPerDay?: number;
  hoursOffset?: number;
  events: (T & CalendarEvent)[];
  setEvents: React.Dispatch<React.SetStateAction<(T & CalendarEvent)[]>>;
  interactive?: boolean;
  abstract?: boolean;
  cellHeight?: number;
  scrollToCurrentTime?: boolean;
  renderEvent?: (event: T & CalendarEvent) => React.ReactNode;
};

type CurrentEvent = {
  id: string;
  state: "new" | "move" | "extendStart" | "extendEnd";
};

const defaultCellHeight = convertRemToPixels(3);

function Calendar<T>({
  startDate,
  events,
  setEvents,
  cellHeight = defaultCellHeight,
  renderEvent,
  daysPerWeek = 7,
  hoursPerDay = 24,
  hoursOffset = 0,
  abstract = false,
  interactive = true,
  scrollToCurrentTime = false,
}: CalendarProps<T>) {
  const endDate = copyDateWith(startDate, {
    date: startDate.getDate() + daysPerWeek - 1,
    hours: 23,
    minutes: 59,
    second: 59,
    milliseconds: 999,
  });
  const [currentEvent, setCurrentEvent] = useState<CurrentEvent | null>(null);
  const [containerScrollTop, setContainerScrollTop] = useState(0);

  const containerEl = useRef<HTMLDivElement | null>(null);
  const eventsGridEl = useRef<HTMLOListElement | null>(null);
  const cellWidthMeasurementEl = useRef<HTMLDivElement | null>(null);
  const cellSize = useElementSize(cellWidthMeasurementEl);
  const eventsGridOffset = useElementOffset(eventsGridEl);

  useEffect(() => {
    if (containerEl.current) {
      const setValue = () => {
        setContainerScrollTop(containerEl.current!.scrollTop);
      };

      containerEl.current.addEventListener("scroll", setValue);
      return () => containerEl.current?.removeEventListener("scroll", setValue);
    }
  }, [containerEl.current]);

  useEffect(() => {
    if (containerEl.current && scrollToCurrentTime) {
      const currentMinute = new Date().getHours() * 60;
      containerEl.current.scrollTop =
        (containerEl.current.scrollHeight * currentMinute) / 1440;
    }
  }, [containerEl.current]);

  const onMouseDown = (e: React.MouseEvent<HTMLOListElement>) => {
    if (
      e.button !== 0 ||
      !interactive ||
      !cellSize ||
      !eventsGridOffset ||
      !containerEl.current
    ) {
      return;
    }

    const cell = getCell(
      {
        x: eventsGridOffset.x,
        y: eventsGridOffset.y + cellHeight,
      },
      {
        x: containerEl.current.scrollLeft + window.scrollX,
        y: containerEl.current.scrollTop + window.scrollY,
      },
      {
        width: cellSize.width,
        height: cellHeight,
      },
      daysPerWeek,
      hoursOffset,
      e.clientX,
      e.clientY
    );

    if (e.target === eventsGridEl.current) {
      const hours = cell.hour;
      const minutes = (cell.hour % 1) * 60;

      const start = copyDateWith(startDate, {
        date: startDate.getDate() + (cell.day - 1),
        hours,
        minutes,
      });

      // const newEvent: T & CalendarEvent = {
      //   id: crypto.randomUUID(),
      //   title: "New Event",
      //   start: new Date(start),
      //   end: copyDateWith(start, { minutes: start.getMinutes() + 30 }),
      // };

      // setEvents([...events, newEvent]);
      // setCurrentEvent({ id: newEvent.id, state: "new" });
      return;
    }

    setCurrentEvent({ id: "0x2", state: "move" });
  };

  const onMouseUp = () => {
    if (currentEvent) {
      setCurrentEvent(null);
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLOListElement>) => {
    if (
      !(
        interactive &&
        currentEvent &&
        cellSize &&
        eventsGridOffset &&
        containerEl.current
      )
    ) {
      return;
    }

    const cell = getCell(
      {
        x: eventsGridOffset.x,
        y: eventsGridOffset.y + cellHeight,
      },
      {
        x: containerEl.current.scrollLeft + window.scrollX,
        y: containerEl.current.scrollTop + window.scrollY,
      },
      {
        width: cellSize.width,
        height: cellHeight,
      },
      daysPerWeek,
      hoursOffset,
      e.clientX,
      e.clientY
    );

    if (currentEvent.state === "new") {
      const newEvents = events.map(event => {
        if (event.id === currentEvent.id) {
          return {
            ...event,
            start: event.start,
            end: copyDateWith(event.end, {
              hours: cell.hour,
              minutes: (cell.hour % 1) * 60 + 30,
            }),
          };
        }

        return event;
      });

      return void setEvents(newEvents);
    }

    if (currentEvent.state === "move") {
      const newEvents = events.map(event => {
        if (event.id === currentEvent.id) {
          const duration = event.end.getTime() - event.start.getTime();
          const newStart = copyDateWith(event.start, {
            hours: cell.hour,
            minutes: (cell.hour % 1) * 60,
          });
          const newEnd = copyDateWith(newStart, {
            milliseconds: newStart.getMilliseconds() + duration,
          });

          return {
            ...event,
            start: newStart,
            end: newEnd,
          };
        }

        return event;
      });

      return void setEvents(newEvents);
    }
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <>
      <div className="flex h-full w-full">
        <div
          ref={containerEl}
          className={`isolate flex flex-auto flex-col scroll-smooth overflow-auto${
            currentEvent ? " select-none" : ""
          }`}
        >
          <div style={{ width: "165%" }} className="flex max-w-full flex-none flex-col">
            <CalendarWeekdayNames
              startDate={startDate}
              abstract={abstract}
              daysPerWeek={daysPerWeek}
              format="short"
              showShadow={containerScrollTop >= 3}
            />

            <div className="flex flex-auto">
              <div className="sticky left-0 z-10 w-14 flex-none ring-1 ring-gray-100" />
              <div className="grid flex-auto grid-cols-1 grid-rows-1">
                {/* Horizontal lines */}
                <CalendarTimeScale
                  cellHeight={cellHeight}
                  hoursPerDay={hoursPerDay}
                  hoursOffset={hoursOffset}
                />

                {/* Vertical lines */}
                <CalendarWeekScale
                  daysPerWeek={daysPerWeek}
                  cellWidthMeasurementElement={cellWidthMeasurementEl}
                />

                {/* Events */}
                <ol
                  ref={eventsGridEl}
                  onMouseDown={onMouseDown}
                  onMouseUp={onMouseUp}
                  onMouseMove={onMouseMove}
                  className={classList(
                    interactive && "cursor-grab",
                    `grid-cols-${daysPerWeek}`,
                    "col-start-1 col-end-2 row-start-1 grid"
                  )}
                  style={{
                    gridTemplateRows: `1.75rem repeat(${
                      12 * hoursPerDay
                    }, minmax(0, 1fr)) auto`,
                  }}
                >
                  {events
                    .filter(event => event.start >= startDate && event.end <= endDate)
                    .map(event => (
                      <Fragment key={event.id}>
                        <CalendarEventView
                          event={event}
                          interactive={interactive}
                          hoursPerDay={hoursPerDay}
                          hoursOffset={hoursOffset}
                          onDelete={() => deleteEvent(event.id)}
                          isDragged={currentEvent?.id === event.id}
                          renderEvent={renderEvent}
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
