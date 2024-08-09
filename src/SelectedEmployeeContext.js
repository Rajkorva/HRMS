import React, { createContext, useContext, useState } from 'react';

const SelectedEmployeeContext = createContext();

export const useSelectedEmployee = () => useContext(SelectedEmployeeContext);

export const SelectedEmployeeProvider = ({ children }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <SelectedEmployeeContext.Provider value={{ selectedEmployee, setSelectedEmployee }}>
      {children}
    </SelectedEmployeeContext.Provider>
  );
};
