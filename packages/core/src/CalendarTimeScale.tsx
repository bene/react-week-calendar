import { Fragment } from "react";

type CalendarTimeScaleProps = {
  cellHeight: number;
  hoursPerDay: number;
  minutesOffset: number;
};

function CalendarTimeScale({
  cellHeight,
  hoursPerDay,
  minutesOffset,
}: CalendarTimeScaleProps) {
  const hourRowViews = Array.from(Array(hoursPerDay).keys()).map(i => {
    const hour = i + minutesOffset / 60;
    return (
      <Fragment key={hour}>
        <div>
          <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
            {`${hour.toString().padStart(2, "0")}:00`}
          </div>
        </div>
        <div />
      </Fragment>
    );
  });

  return (
    <>
      <div
        className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
        style={{
          gridTemplateRows: `repeat(${hoursPerDay * 2}, minmax(${cellHeight}px, 1fr))`,
        }}
      >
        <div className="row-end-1 h-7" />
        {hourRowViews}
      </div>
    </>
  );
}

export default CalendarTimeScale;
