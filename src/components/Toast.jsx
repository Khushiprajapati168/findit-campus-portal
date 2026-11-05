import React, { useEffect } from 'react';
import { IconCheckCircle, IconAlertCircle, IconInfo, IconX } from './Icons';

export const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const { type = 'info', message = '' } = toast;

  const icons = {
    success: <IconCheckCircle size={20} className="toast-icon success" />,
    error: <IconAlertCircle size={20} className="toast-icon error" />,
    info: <IconInfo size={20} className="toast-icon info" />
  };

  return (
    <div className={`toast-container toast-${type}`}>
      <div className="toast-body">
        {icons[type] || icons.info}
        <span className="toast-text">{message}</span>
      </div>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        <IconX size={16} />
      </button>
    </div>
  );
};
