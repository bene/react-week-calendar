type CalendarWeekScaleProps = {
  cellWidthMeasurementElement: React.MutableRefObject<HTMLDivElement | null>;
};

function CalendarWeekScale(props: CalendarWeekScaleProps) {
  return (
    <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
      <div
        ref={props.cellWidthMeasurementElement}
        className="col-start-1 row-span-full"
      />
      <div className="col-start-2 row-span-full" />
      <div className="col-start-3 row-span-full" />
      <div className="col-start-4 row-span-full" />
      <div className="col-start-5 row-span-full" />
      <div className="col-start-6 row-span-full" />
      <div className="col-start-7 row-span-full" />
    </div>
  );
}

export default CalendarWeekScale;
