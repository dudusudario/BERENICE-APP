import React, { useEffect, useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi';
import '../styles/toast.css';

const ICONS = {
  success: <FiCheckCircle size={20} />,
  error: <FiAlertCircle size={20} />,
  warning: <FiAlertTriangle size={20} />,
  info: <FiInfo size={20} />
};

const Toast = ({ message, type = 'info', duration = 3000, onRemove }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const progressInterval = setInterval(() => {
      const now = Date.now();
      const remaining = endTime - now;
      const newProgress = (remaining / duration) * 100;

      if (remaining <= 0) {
        clearInterval(progressInterval);
        setIsVisible(false);
        setTimeout(() => onRemove(), 300); // Aguarda a animação de saída
      } else {
        setProgress(newProgress);
      }
    }, 10);

    return () => clearInterval(progressInterval);
  }, [duration, onRemove]);

  return (
    <div className={`toast ${type} ${!isVisible ? 'hide' : ''}`}>
      <div className="toast-icon">
        {ICONS[type]}
      </div>
      <div className="toast-message">
        {message}
      </div>
      <div 
        className="toast-progress"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default Toast; 