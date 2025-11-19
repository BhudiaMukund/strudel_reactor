import { createContext, useContext, useState } from "react";

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  // Store all running toasts.
  const [toasts, setToasts] = useState([]);

  // Saves new toast.
  const showToast = (message, type = "success") => {
    const id = Date.now();

    // Add toast at the end of list to ensure order.
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      // Remove the toast after 3s.
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container position-fixed top-0 end-0 p-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast show text-bg-${t.type} border-0 mb-2`}
          >
            <div className="d-flex">
              <div className="toast-body">{t.message}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() =>
                  setToasts((prev) => prev.filter((x) => x.id !== t.id))
                }
              ></button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
