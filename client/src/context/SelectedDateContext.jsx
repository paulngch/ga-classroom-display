import { DateTime } from "luxon";
import React, { useContext, useState, createContext } from "react";

const SelectedDateContext = createContext();

export function useSelectedDate() {
  return useContext(SelectedDateContext);
}

export function SelectedDateProvider({ children }) {
  //Setting selected date to today
  const [selectedDate, setSelectedDate] = useState(
    DateTime.now().toFormat("yyyy-MM-dd")
  );

  return (
    <SelectedDateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </SelectedDateContext.Provider>
  );
}
