import { useState } from "react";
import Calendar, { CalendarEvent } from "../../core/src";

type CalendarEventWithName = CalendarEvent & {
  name: string;
};

function App() {
  const [events, setEvents] = useState<CalendarEventWithName[]>([
    {
      id: "0x1",
      name: "Bene",
      title: "Meeting",
      start: new Date(2023, 0, 2, 1, 30, 0),
      end: new Date(2023, 0, 2, 5, 30, 0),
    },
    {
      id: "0x2",
      name: "Bene",
      title: "Cinema",
      start: new Date(2023, 0, 4, 3, 0, 0),
      end: new Date(2023, 0, 4, 5, 0, 0),
    },
  ]);

  return (
    <div className="h-screen w-screen">
      <Calendar
        hoursPerDay={12}
        hoursOffset={1}
        startDate={new Date(2023, 0, 2)}
        events={events}
        setEvents={setEvents}
        abstract
      />
    </div>
  );
}

export default App;
