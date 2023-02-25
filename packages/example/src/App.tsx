import { useState } from "react";
import Calendar, { CalendarEvent } from "../../core/src";

type EventWithType = CalendarEvent & { type: "Work" | "Leisure" };

function App() {
  const [events, setEvents] = useState<EventWithType[]>([
    {
      id: crypto.randomUUID(),
      title: "Meeting",
      start: new Date(2023, 0, 2, 1, 30, 0),
      end: new Date(2023, 0, 2, 5, 30, 0),
      type: "Work",
    },
    {
      id: crypto.randomUUID(),
      title: "Cinema",
      start: new Date(2023, 0, 4, 3, 5, 0),
      end: new Date(2023, 0, 4, 5, 0, 0),
      type: "Leisure",
    },
    {
      id: crypto.randomUUID(),
      title: "Cinema",
      start: new Date(2023, 0, 5, 3, 15, 0),
      end: new Date(2023, 0, 5, 5, 0, 0),
      type: "Leisure",
    },
    {
      id: crypto.randomUUID(),
      title: "Cinema",
      start: new Date(2023, 0, 6, 3, 30, 0),
      end: new Date(2023, 0, 6, 5, 0, 0),
      type: "Leisure",
    },
  ]);

  return (
    <div className="h-screen w-screen">
      <Calendar
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
