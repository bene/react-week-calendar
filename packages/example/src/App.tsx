import { useState } from "react";
import Calendar, { CalendarEvent } from "../../core/src";

type EventWithType = CalendarEvent & { type: "Work" | "Leisure" };

function App() {
  const [showWeekend, setShowWeekend] = useState(true);
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
      <div className="border p-4">
        <button
          onClick={() => setShowWeekend(!showWeekend)}
          className="rounded bg-teal-400 px-4 py-1 text-white"
        >
          {showWeekend ? "Hide weekend" : "Show weekend"}
        </button>
      </div>
      <Calendar
        minutesOffset={9 * 60}
        hoursPerDay={24 - 9}
        daysPerWeek={showWeekend ? 7 : 5}
        startDate={new Date(2023, 0, 2)}
        events={events}
        setEvents={setEvents}
        onCreateEvent={event => ({ ...event, type: "Work" as const })}
        abstract
      />
    </div>
  );
}

export default App;
