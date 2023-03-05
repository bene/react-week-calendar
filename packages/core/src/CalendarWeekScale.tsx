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
      className="row-span-full"
      style={{
        gridColumnStart: i + 1,
      }}
    />
  ));

  return (
    <div
      className="col-start-1 col-end-2 row-start-1 hidden grid-rows-1 divide-x divide-gray-100 sm:grid"
      style={{
        gridTemplateColumns: `repeat(${daysPerWeek}, minmax(0, 1fr))`,
      }}
    >
      {columnViews}
    </div>
  );
}

export default CalendarWeekScale;
