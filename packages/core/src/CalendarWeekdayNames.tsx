function CalendarWeekdayNames() {
  return (
    <div className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5">
      <div className="-mr-px grid grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500">
        <div className="col-end-1 w-14" />
        <div className="flex items-center justify-center py-3">
          <span>Montag</span>
        </div>
        <div className="flex items-center justify-center py-3">
          <span>Dienstag</span>
        </div>
        <div className="flex items-center justify-center py-3">
          <span className="flex items-baseline">Mittwoch</span>
        </div>
        <div className="flex items-center justify-center py-3">
          <span>Donnerstag</span>
        </div>
        <div className="flex items-center justify-center py-3">
          <span>Freitag</span>
        </div>
        <div className="flex items-center justify-center py-3">
          <span>Samstag</span>
        </div>
        <div className="flex items-center justify-center py-3">
          <span>Sonntag</span>
        </div>
      </div>
    </div>
  );
}

export default CalendarWeekdayNames;
