import { classList } from "./utils";

type CalendarWeekScaleProps = {
  cellWidthMeasurementElement: React.MutableRefObject<HTMLDivElement | null>;
  daysPerWeek: number;
};

function CalendarWeekScale({
  cellWidthMeasurementElement,
  daysPerWeek,
}: CalendarWeekScaleProps) {
  const columnViews = Array.from(Array(daysPerWeek).keys()).map(i => (
    <div
      key={i}
      ref={i === 0 ? cellWidthMeasurementElement : null}
      className={`col-start-${i + 1} row-span-full`}
    />
  ));

  return (
    <div
      className={classList(
        `grid-cols-${daysPerWeek}`,
        "col-start-1 col-end-2 row-start-1 hidden grid-rows-1 divide-x divide-gray-100 sm:grid"
      )}
    >
      {columnViews}
    </div>
  );
}

const _twInclude = [
  "grid-cols-1",
  "grid-cols-2",
  "grid-cols-3",
  "grid-cols-4",
  "grid-cols-5",
  "grid-cols-6",
  "grid-cols-7",
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export default CalendarWeekScale;
