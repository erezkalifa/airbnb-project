import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { addMonths } from "date-fns";
import { DateToggleGroup } from "./DateToggleGroup";
import { DateFlexibilityToggle } from "./DateFlexibilityToggle";

export function CalendarRangePicker({ onChange }) {
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
            defaultValue={month}
            onChange={(date) => onChange?.(date, i)}
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
