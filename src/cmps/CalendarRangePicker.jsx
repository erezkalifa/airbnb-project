import React from "react";
import { useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { addMonths } from "date-fns";
import { DateToggleGroup } from "./DateToggleGroup";
import { DateFlexibilityToggle } from "./DateFlexibilityToggle";

export function CalendarRangePicker({value, onChange}) {
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const handleDateChange = (date, index) => {
    const newDates = [...selectedDates];
    newDates[index] = date;
    setSelectedDates(newDates);
    onChange?.(date, index);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="modal-date-header">
        <DateToggleGroup />
      </div>

      <div style={{ display: "flex" }}>
        {[new Date(), addMonths(new Date(), 1)].map((month, i) => (
          <DateCalendar
            key={i}
            views={["day"]}
            value={value}
            onChange={(date) => handleDateChange(date, i)}
            sx={{
              "& .MuiPickersArrowSwitcher-root": {
                display: "none",
              },
            }}
            dayOfWeekFormatter={(date) =>
              date.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 2)
            }
          />
        ))}
      </div>

      <div className="modal-date-header">
        <DateFlexibilityToggle />
      </div>
    </LocalizationProvider>
  );
}
