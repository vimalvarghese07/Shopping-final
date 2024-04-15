import { createContext, useContext, useState } from 'react';

const SelectedContext = createContext();

export const SelectedProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const setItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <SelectedContext.Provider value={{ selectedItem, setItem }}>
      {children}
    </SelectedContext.Provider>
  );
};

export const useSelected = () => {
  const context = useContext(SelectedContext);
  if (!context) {
    throw new Error('useSelected must be used within a SelectedProvider');
  }
  return context;
};