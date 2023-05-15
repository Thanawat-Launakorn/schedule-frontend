import React from "react";

type ScrollTopProps = {
  children: React.ReactNode;
};

type ScrollTopContextProps = {};

const ScrollTopContext = React.createContext<ScrollTopContextProps>({});

export const ScrollTopProvider = ({ children }: ScrollTopProps) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <ScrollTopContext.Provider value={{}}>{children}</ScrollTopContext.Provider>
  );
};
