import TrashIcon from "./TrashIcon";

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

function dateSpanToGridRowSpan(start: Date, end: Date) {
  const startHour = start.getHours() + start.getMinutes() / 60;
  const eventDurationInHours =
    (end.getTime() - start.getTime()) / 1000 / 60 / 60;

  return `${Math.round(startHour * 12 + 2)} / span ${
    eventDurationInHours * 12
  }`;
}

type CalendarEventViewProps = {
  event: CalendarEvent;
  isDragged: boolean;
  onDelete: () => void;
};

function CalendarEventView({
  event,
  isDragged,
  onDelete,
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
        className={`group absolute inset-1 rounded flex flex-col overflow-y-auto p-2 text-xs leading-5 ${
          isDragged
            ? "bg-blue-100 cursor-grabbing"
            : "bg-blue-50 hover:bg-blue-100 cursor-grab"
        }`}
      >
        <div className="flex gap-2 items-center justify-between">
          <p className="text-blue-500 group-hover:text-blue-700">
            <time dateTime="2022-01-12T06:00">
              {timeFormat.format(event.start)}
            </time>
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
            <TrashIcon className="text-blue-700 cursor-pointer" />
          </button>
        </div>

        <p
          className={`text-blue-500 font-semibold ${
            isDragged ? "text-blue-700" : "group-hover:text-blue-700"
          }`}
        >
          {event.title}
        </p>
      </div>
    </li>
  );
}

export default CalendarEventView;
