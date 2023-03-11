![Example](.github/example.png)

# react-week-calendar

A zero dependency week calendar for React.

## Example

```typescript
import Calendar, { CalendarEvent } from "../../core/src";

type EventWithType = CalendarEvent & { type: "Work" | "Leisure" };

function App() {
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
  ]);

  return (
    <div className="h-screen w-screen">
      <Calendar
        minutesOffset={9 * 60}
        hoursPerDay={24 - 9}
        daysPerWeek={7}
        startDate={new Date(2023, 0, 2)}
        events={events}
        setEvents={setEvents}
        onCreateEvent={event => ({ ...event, type: "Work" as const })}
        abstract
      />
    </div>
  );
}
```

## Roadmap

- [ ] Touch support
- [ ] Mobile support
- [ ] Cross-day events
- [ ] Overlapping events
- [ ] Custom styles support
- [ ] Remove Tailwind
