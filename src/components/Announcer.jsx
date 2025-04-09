import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ARIA_LIVE_POLITE, MIN_NOTIFICATION_TIME } from '../config/accessibility';

const Announcer = ({ 
  message, 
  politeness = ARIA_LIVE_POLITE, 
  clearAfter = 7000,
  children 
}) => {
  const [announcement, setAnnouncement] = useState(message);

  useEffect(() => {
    if (message) {
      setAnnouncement(message);
      
      // Limpar a mensagem após o tempo definido
      const timer = setTimeout(() => {
        setAnnouncement('');
      }, Math.max(clearAfter, MIN_NOTIFICATION_TIME));
      
      return () => clearTimeout(timer);
    }
  }, [message, clearAfter]);

  return (
    <div>{announcement}</div>
  );
};

Announcer.propTypes = {
  message: PropTypes.string.isRequired,
  politeness: PropTypes.string,
  clearAfter: PropTypes.number,
  children: PropTypes.node
};

export default Announcer; 