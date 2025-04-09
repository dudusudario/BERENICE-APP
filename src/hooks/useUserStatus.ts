import { useState, useEffect, useCallback } from 'react';

type UserStatus = 'online' | 'offline' | 'away';

export const useUserStatus = () => {
  const [status, setStatus] = useState<UserStatus>(() => {
    const savedStatus = localStorage.getItem('userStatus') as UserStatus;
    return savedStatus || 'offline';
  });

  const [lastActivity, setLastActivity] = useState<Date>(() => {
    const savedActivity = localStorage.getItem('lastActivity');
    return savedActivity ? new Date(savedActivity) : new Date();
  });

  // Atualizar status no localStorage
  useEffect(() => {
    localStorage.setItem('userStatus', status);
  }, [status]);

  // Atualizar lastActivity no localStorage
  useEffect(() => {
    localStorage.setItem('lastActivity', lastActivity.toISOString());
  }, [lastActivity]);

  // Verificar inatividade a cada minuto
  useEffect(() => {
    const checkInactivity = () => {
      const now = new Date();
      const inactiveTime = now.getTime() - lastActivity.getTime();
      
      // Se inativo por mais de 5 minutos, mudar para away
      if (inactiveTime > 5 * 60 * 1000 && status === 'online') {
        setStatus('away');
      }
    };

    const interval = setInterval(checkInactivity, 60 * 1000);
    return () => clearInterval(interval);
  }, [lastActivity, status]);

  // Atualizar lastActivity em interações do usuário
  useEffect(() => {
    const updateOnActivity = () => {
      updateActivity();
    };

    window.addEventListener('mousemove', updateOnActivity);
    window.addEventListener('keydown', updateOnActivity);
    window.addEventListener('click', updateOnActivity);
    window.addEventListener('touchstart', updateOnActivity);

    return () => {
      window.removeEventListener('mousemove', updateOnActivity);
      window.removeEventListener('keydown', updateOnActivity);
      window.removeEventListener('click', updateOnActivity);
      window.removeEventListener('touchstart', updateOnActivity);
    };
  }, []);

  const setUserStatus = useCallback(async (newStatus: UserStatus) => {
    setStatus(newStatus);
    setLastActivity(new Date());
  }, []);

  const updateActivity = useCallback(async () => {
    setLastActivity(new Date());
    if (status === 'away') {
      setStatus('online');
    }
  }, [status]);

  return {
    status,
    lastActivity,
    setStatus: setUserStatus,
    updateActivity,
  };
}; 