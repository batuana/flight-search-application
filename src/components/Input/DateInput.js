import { useState, useEffect } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { getFormattedDate } from "../../util/date";

export default function DateInput({
  label,
  style,
  value,
  setValue,
  enabled = true,
  isValid,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleCalendar() {
    if (enabled) setIsOpen((open) => !open);
  }

  function onDayClick(newDate) {
    toggleCalendar();
    setValue(newDate);
  }

  useEffect(() => {
    if (!enabled) setIsOpen(false);
  }, [enabled]);

  return (
    <div style={style} className="input-container">
      <div
        className={`input-box date-input ${
          enabled ? "" : "date-input-disabled"
        } ${!isValid && enabled ? "input-box-error" : ""}`}
        type="text"
        onClick={toggleCalendar}
      >
        {enabled && (
          <span style={{ marginTop: 10 }}>{getFormattedDate(value)}</span>
        )}
      </div>
      <div className="input-label input-label-top">{label}</div>
      {isOpen && enabled && (
        <div className="calendar-container">
          <DayPicker
            disabled={{ before: new Date() }}
            styles={{
              months: {
                backgroundColor: "#dce0e4",
                padding: "25px",
                borderRadius: "10px",
              },
              day: {
                fontSize: "12px",
              },
            }}
            mode="single"
            numberOfMonths={2}
            pagedNavigation
            selected={value}
            onDayClick={onDayClick}
          />
        </div>
      )}
    </div>
  );
}
