import TrashIcon from "./TrashIcon";
import { CalendarEvent } from "./types";
import { classList } from "./utils";

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

function dateSpanToGridRowSpan(start: Date, end: Date, hoursOffset: number) {
  const startMinutes = start.getHours() * 60 + start.getMinutes();
  const durationInMinutes = Math.ceil((end.getTime() - start.getTime()) / 1000 / 60);

  const hours = minutesToDecimalHours(startMinutes) - hoursOffset;
  const durationHours = minutesToDecimalHours(durationInMinutes);

  return `${hours * 12 + 2} / span ${durationHours * 12}`;
}

type CalendarEventViewProps<T> = {
  event: T & CalendarEvent;
  hoursPerDay: number;
  hoursOffset: number;
  isDragged: boolean;
  interactive: boolean;
  onDelete: () => void;
  renderEvent?: (event: T & CalendarEvent) => React.ReactNode;
};

function CalendarEventView<T extends CalendarEvent>({
  event,
  hoursPerDay,
  hoursOffset,
  isDragged,
  onDelete,
  renderEvent,
  interactive,
}: CalendarEventViewProps<T>) {
  const weekday = event.start.getDay();

  return (
    // rome-ignore lint/a11y/useKeyWithClickEvents: TODO
    <li
      onClick={event.onClick}
      className={`relative mt-px hidden sm:flex ${weekdayClasses[weekday]}`}
      style={{
        gridRow: dateSpanToGridRowSpan(event.start, event.end, hoursOffset),
      }}
    >
      {!isDragged && (
        <div className="absolute top-0 left-0 right-0 z-20 h-4 cursor-n-resize" />
      )}

      <div className="absolute inset-0 z-10 overflow-hidden">
        {renderEvent ? (
          renderEvent(event)
        ) : (
          <div className="h-full w-full p-1">
            <div
              className={classList(
                "h-full w-full overflow-y-auto rounded p-2 text-xs leading-5",
                isDragged ? "cursor-grabbing bg-teal-100" : "bg-teal-50",
                interactive && !isDragged && "cursor-grab hover:bg-teal-100"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <p
                  className={classList(
                    "text-teal-500",
                    interactive && "group-hover:text-teal-700"
                  )}
                >
                  <time dateTime="2022-01-12T06:00">
                    {timeFormat.format(event.start)}
                  </time>
                </p>

                <button
                  className={classList(
                    "hidden",
                    isDragged && interactive && "group-hover:block"
                  )}
                  onClick={() => {
                    if (event.onDelete) {
                      event.onDelete();
                    }
                    onDelete();
                  }}
                >
                  <TrashIcon className="cursor-pointer text-teal-700" />
                </button>
              </div>

              <p
                className={classList(
                  "font-semibold text-teal-500",
                  isDragged && "text-teal-700",
                  interactive && !isDragged && "group-hover:text-teal-700"
                )}
              >
                {event.title}
              </p>
            </div>
          </div>
        )}
      </div>

      {!isDragged && (
        <div className="absolute bottom-0 left-0 right-0 z-20 h-4 cursor-s-resize" />
      )}
    </li>
  );
}

export default CalendarEventView;
