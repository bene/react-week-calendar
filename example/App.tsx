import React, { useState } from "react";

import Calendar from "../src/Calendar";
import { CalendarEvent } from "../src/types";
import { convertRemToPixels } from "../src/utils";

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "0x1",
      title: "Meeting",
      start: new Date(1971, 0, 4, 1, 30, 0),
      end: new Date(1971, 0, 4, 5, 30, 0),
    },
    {
      id: "0x2",
      title: "Cinema",
      start: new Date(1971, 0, 6, 3, 0, 0),
      end: new Date(1971, 0, 6, 5, 0, 0),
    },
  ]);

  return (
    <div className="h-screen w-screen">
      <Calendar
        events={events}
        setEvents={setEvents}
        cellHeight={convertRemToPixels(2)}
      />
    </div>
  );
}

export default App;
