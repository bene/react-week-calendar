import { useState } from "react";
import Calendar, { CalendarEvent } from "../../core/src";

type EventWithType = CalendarEvent & { type: "Work" | "Leisure" };

function App() {
  const [showWeekend, setShowWeekend] = useState(true);
  const [isAbstract, setAbstract] = useState(true);
  const [events, setEvents] = useState<EventWithType[]>([
    {
      id: crypto.randomUUID(),
      title: "Meeting",
      start: new Date(2023, 0, 2, 10, 30, 0),
      end: new Date(2023, 0, 2, 12, 30, 0),
      type: "Work",
    },
    {
      id: crypto.randomUUID(),
      title: "Cinema",
      start: new Date(2023, 0, 4, 13, 0, 0),
      end: new Date(2023, 0, 4, 15, 0, 0),
      type: "Leisure",
    },
    {
      id: crypto.randomUUID(),
      title: "Cinema",
      start: new Date(2023, 0, 4, 15, 0, 0),
      end: new Date(2023, 0, 4, 16, 0, 0),
      type: "Leisure",
    },
    {
      id: crypto.randomUUID(),
      title: "Cinema",
      start: new Date(2023, 0, 5, 13, 15, 0),
      end: new Date(2023, 0, 5, 15, 0, 0),
      type: "Leisure",
    },
    {
      id: crypto.randomUUID(),
      title: "Cinema",
      start: new Date(2023, 0, 6, 13, 30, 0),
      end: new Date(2023, 0, 6, 15, 0, 0),
      type: "Leisure",
    },
  ]);

  return (
    <div className="h-screen w-screen">
      <div className="flex items-center justify-between gap-2 border-b p-4">
        <a href="https://github.com/bene/react-week-calendar">
          <img className="h-6 w-6" src="/github.svg" alt="GitHub" />
        </a>

        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => setAbstract(!isAbstract)}
            className="rounded bg-gray-400 px-4 py-1 text-sm uppercase text-white shadow transition-colors hover:bg-gray-500"
          >
            {isAbstract ? "Show dates" : "Abstract mode"}
          </button>

          <button
            onClick={() => setShowWeekend(!showWeekend)}
            className="rounded bg-gray-400 px-4 py-1 text-sm uppercase text-white shadow transition-colors hover:bg-gray-500"
          >
            {showWeekend ? "Hide weekend" : "Show weekend"}
          </button>
        </div>
      </div>

      <Calendar
        minutesOffset={9 * 60}
        hoursPerDay={24 - 9}
        daysPerWeek={showWeekend ? 7 : 5}
        startDate={new Date(2023, 0, 2)}
        events={events}
        setEvents={setEvents}
        onCreateEvent={event => ({ ...event, type: "Work" as const })}
        abstract={isAbstract}
      />
    </div>
  );
}

export default App;
