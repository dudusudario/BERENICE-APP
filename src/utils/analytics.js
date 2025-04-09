import ReactGA from 'react-ga4';

// Inicializa o Google Analytics
export const initGA = () => {
  ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);
};

// Registra uma visualização de página
export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

// Registra um evento
export const logEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label
  });
};

// Registra um erro
export const logError = (error, fatal = false) => {
  ReactGA.event({
    category: 'Error',
    action: error.message || 'Unknown error',
    label: error.stack || 'No stack trace',
    fatal
  });
};

// Registra uma ação do usuário
export const logUserAction = (action, value) => {
  ReactGA.event({
    category: 'User',
    action,
    value
  });
};

// Registra uma métrica de performance
export const logPerformance = (metric, value) => {
  ReactGA.event({
    category: 'Performance',
    action: metric,
    value
  });
}; 