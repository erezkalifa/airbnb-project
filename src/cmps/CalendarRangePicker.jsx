import React, { useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { addMonths } from "date-fns";
import { DateToggleGroup } from "./DateToggleGroup";
import { DateFlexibilityToggle } from "./DateFlexibilityToggle";

export function CalendarRangePicker({ filterBy, onSetFilter }) {
  const [selectedDates, setSelectedDates] = useState([null, null]);

  const handleDateChange = (date, index) => {
    const newDates = [...selectedDates];
    newDates[index] = date;
    setSelectedDates(newDates);

    
    if (newDates[0] && newDates[1]) {
      onSetFilter({
        ...filterBy,
        checkIn: newDates[0],
        checkOut: newDates[1],
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="modal-date-header">
        <DateToggleGroup />
      </div>

      <div style={{ display: "flex", gap: "16px" }}>
        {/* Show two months: current and next */}
        {[new Date(), addMonths(new Date(), 1)].map((month, i) => (
          <DateCalendar
            key={i}
            views={["day"]}
            // defaultCalendarMonth={month} 
            value={selectedDates[i] || null}
            onChange={(date) => handleDateChange(date, i)}
            // Show arrows for month navigation
            sx={{
              "& .MuiPickersArrowSwitcher-root": {
                display: "flex",
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
