import React, { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

export default Notification; 