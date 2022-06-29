import { useState, createContext, useContext, useMemo } from 'react';

import { AlertState, AlertSeverity } from '../types/types';

const DEFAULT_TIEMOUT_SEC = 5;

export const AlertContext = createContext<AlertState>({
  alertSeverity: AlertSeverity.INFO,
  alertMessage: null,
  alertTitle: null,
  alertOpen: false,
  setError: () => '',
  setWarning: () => '',
  setInfo: () => '',
  setSuccess: () => '',
  clearAlert: () => '',
});

AlertContext.displayName = 'AlertContext';

const AlertProvider = ({ children }: { children: React.ReactElement }) => {
  const [alertSeverity, setAlertSeverity] = useState<AlertSeverity>(
    AlertSeverity.INFO,
  );
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertTitle, setAlertTitle] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const clearAlert = () => {
    setAlertOpen(false);
    setAlertTitle(null);
    setAlertMessage(null);
  };

  const setAlert = (
    severity: AlertSeverity,
    message: string,
    title?: string,
    timeout?: number,
  ) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setAlertOpen(true);
    if (title) setAlertTitle(title);
    if (timeout === undefined) {
      setTimeout(() => {
        clearAlert();
      }, DEFAULT_TIEMOUT_SEC * 1000);
    }
    if (timeout) {
      setTimeout(() => {
        clearAlert();
      }, timeout * 1000);
    }
  };

  const setError = (message: string, title?: string, timeout?: number) =>
    setAlert(AlertSeverity.ERROR, message, title, timeout);

  const setSuccess = (message: string, title?: string, timeout?: number) =>
    setAlert(AlertSeverity.SUCCESS, message, title, timeout);

  const setWarning = (message: string, title?: string, timeout?: number) =>
    setAlert(AlertSeverity.WARNING, message, title, timeout);

  const setInfo = (message: string, title?: string, timeout?: number) =>
    setAlert(AlertSeverity.INFO, message, title, timeout);

  const value = useMemo(
    () => ({
      alertSeverity,
      alertMessage,
      alertTitle,
      alertOpen,
      setError,
      setSuccess,
      setWarning,
      setInfo,
      clearAlert,
      // clear: () => setSeverity(AlertSeverity.NO_ALERT),
    }),
    [alertSeverity, alertMessage, alertTitle, alertOpen],
  );

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);

export default AlertProvider;
