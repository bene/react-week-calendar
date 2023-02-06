import TrashIcon from "./TrashIcon";
import { CalendarEvent } from "./types";

const weekdayClasses = [
  "sm:col-start-7",
  "sm:col-start-1",
  "sm:col-start-2",
  "sm:col-start-3",
  "sm:col-start-4",
  "sm:col-start-5",
  "sm:col-start-6",
];

const timeFormat = new Intl.DateTimeFormat(navigator.language, {
  hour: "2-digit",
  minute: "2-digit",
});

function minutesToDecimalHours(minutes: number): number {
  return Math.ceil((minutes / 60) * 4) / 4;
}

function dateSpanToGridRowSpan(start: Date, end: Date) {
  const startMinutes = start.getHours() * 60 + start.getMinutes();
  const durationInMinutes = Math.ceil((end.getTime() - start.getTime()) / 1000 / 60);

  const hours = minutesToDecimalHours(startMinutes);
  const durationHours = minutesToDecimalHours(durationInMinutes);

  return `${hours * 12 + 2} / span ${durationHours * 12}`;
}

type CalendarEventViewProps = {
  event: CalendarEvent;
  isDragged: boolean;
  daysPerWeek: number;
  onDelete: () => void;
  renderEvent?: (event: CalendarEvent) => React.ReactNode;
};

function CalendarEventView({
  event,
  isDragged,
  daysPerWeek,
  onDelete,
  renderEvent,
}: CalendarEventViewProps) {
  const weekday = event.start.getDay();

  return (
    // rome-ignore lint/a11y/useKeyWithClickEvents: TODO
    <li
      onClick={event.onClick}
      className={`relative mt-px hidden sm:flex ${weekdayClasses[weekday]}`}
      style={{
        gridRow: dateSpanToGridRowSpan(event.start, event.end),
      }}
    >
      <div
        className={`group absolute inset-1 flex flex-col overflow-y-auto rounded p-2 text-xs leading-5 ${
          isDragged
            ? "cursor-grabbing bg-blue-100"
            : "cursor-grab bg-blue-50 hover:bg-blue-100"
        }`}
      >
        {renderEvent ? (
          renderEvent(event)
        ) : (
          <>
            <div className="flex items-center justify-between gap-2">
              <p className="text-blue-500 group-hover:text-blue-700">
                <time dateTime="2022-01-12T06:00">{timeFormat.format(event.start)}</time>
              </p>

              <button
                className={`hidden${isDragged ? "" : " group-hover:block"}`}
                onClick={() => {
                  if (event.onDelete) {
                    event.onDelete();
                  }
                  onDelete();
                }}
              >
                <TrashIcon className="cursor-pointer text-blue-700" />
              </button>
            </div>

            <p
              className={`font-semibold text-blue-500 ${
                isDragged ? "text-blue-700" : "group-hover:text-blue-700"
              }`}
            >
              {event.title}
            </p>
          </>
        )}
      </div>
    </li>
  );
}

export default CalendarEventView;
