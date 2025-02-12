import { createContext, useContext } from "react";
import { toast } from "react-toastify";

const ToasterContext = createContext();

export const useToast = () => useContext(ToasterContext);

export const ToasterProvider = ({ children }) => {
  const showToast = (message, type = "success", autoClose = 5000) => {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    toast(message, {
      type,
      autoClose,
      closeButton: true,
      theme,
      className: "w-2/6",
      bodyClassName: "cursor-pointer",
    });
  };

  return (
    <ToasterContext.Provider value={{ showToast }}>
      {children}
    </ToasterContext.Provider>
  );
};
