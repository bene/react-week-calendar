import { useMemo } from "react";
import { classList } from "./utils";

type CalendarWeekdayNamesProps = {
  startDate: Date;
  format: "long" | "short" | "narrow";
  abstract: boolean;
  showShadow: boolean;
  daysPerWeek: number;
};

function CalendarWeekdayNames({
  startDate,
  format,
  abstract,
  daysPerWeek,
  showShadow,
}: CalendarWeekdayNamesProps) {
  const dayFormat = useMemo(() => {
    return new Intl.DateTimeFormat(navigator.language, {
      weekday: format,
    });
  }, []);

  const dateFormat = useMemo(() => {
    return new Intl.DateTimeFormat(navigator.language, {
      day: "2-digit",
    });
  }, []);

  const dayViews = Array.from(Array(daysPerWeek).keys())
    .map(day => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + day);
      return date;
    })
    .map(dayDate => (
      <div
        key={dayFormat.format(dayDate)}
        className="flex items-center justify-center py-3"
      >
        <span>
          {dayFormat.format(dayDate)}
          {!abstract && (
            <>
              {" "}
              <span className="items-center justify-center font-semibold text-gray-900">
                {dateFormat.format(dayDate)}
              </span>
            </>
          )}
        </span>
      </div>
    ));

  return (
    <div
      className={classList(
        showShadow && "shadow",
        "sticky top-0 z-30 flex-none bg-white ring-1 ring-black ring-opacity-5 transition-shadow"
      )}
    >
      <div
        className="grid divide-x divide-gray-100 text-sm leading-6 text-gray-500"
        style={{
          gridTemplateColumns: `repeat(${daysPerWeek}, minmax(0, 1fr))`,
        }}
      >
        <div className="col-end-1 w-14" />
        {dayViews}
      </div>
    </div>
  );
}

export default CalendarWeekdayNames;
