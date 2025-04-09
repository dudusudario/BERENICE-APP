import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Announcer from './Announcer';
import { FORM_ERROR_MESSAGE, FORM_SUCCESS_MESSAGE } from '../config/accessibility';

const LoginForm = ({ onSubmit, onSuccess }) => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  
  const formRef = useRef(null);
  const emailRef = useRef(null);
  const firstErrorRef = useRef(null);

  // Foca o primeiro campo ao montar o componente
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);
  
  // Foca o primeiro campo com erro após tentativa de envio
  useEffect(() => {
    if (firstErrorRef.current) {
      firstErrorRef.current.focus();
    }
  }, [errors]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'E-mail é obrigatório';
    if (!emailRegex.test(email)) return 'E-mail inválido';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Senha é obrigatória';
    if (password.length < 6) return 'Senha deve ter pelo menos 6 caracteres';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = '';
    
    if (name === 'email') {
      errorMessage = validateEmail(value);
    } else if (name === 'password') {
      errorMessage = validatePassword(value);
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
    
    return errorMessage === '';
  };

  const validateForm = () => {
    const emailError = validateField('email', values.email);
    const passwordError = validateField('password', values.password);
    
    // Definir referência para o primeiro campo com erro
    if (!emailError) {
      firstErrorRef.current = emailRef.current;
    }
    
    return emailError && passwordError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Marcar todos os campos como tocados
    setTouched({
      email: true,
      password: true
    });
    
    const isValid = validateForm();
    
    if (!isValid) {
      setAnnouncement(FORM_ERROR_MESSAGE);
      return;
    }
    
    try {
      setSubmitting(true);
      await onSubmit(values);
      setSubmitted(true);
      setAnnouncement(FORM_SUCCESS_MESSAGE);
      
      // Limpar formulário após sucesso
      setValues({
        email: '',
        password: ''
      });
      
      setTouched({
        email: false,
        password: false
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setAnnouncement(`Erro ao enviar: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Announcer message={announcement}>
      <form 
        ref={formRef}
        onSubmit={handleSubmit} 
        noValidate
        aria-labelledby="login-heading"
      >
        <h2 id="login-heading">Entrar na conta</h2>
        
        <div className="form-group">
          <label htmlFor="email" id="email-label">
            E-mail
            {errors.email && touched.email && (
              <span className="sr-only"> - {errors.email}</span>
            )}
          </label>
          <input
            ref={emailRef}
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={errors.email && touched.email ? 'true' : 'false'}
            aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
            aria-required="true"
            className={errors.email && touched.email ? 'input-error' : ''}
            required
          />
          {errors.email && touched.email && (
            <div 
              className="error-message" 
              id="email-error"
              aria-live="polite"
            >
              {errors.email}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="password" id="password-label">
            Senha
            {errors.password && touched.password && (
              <span className="sr-only"> - {errors.password}</span>
            )}
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={errors.password && touched.password ? 'true' : 'false'}
            aria-describedby={errors.password && touched.password ? 'password-error' : undefined}
            aria-required="true"
            className={errors.password && touched.password ? 'input-error' : ''}
            required
          />
          {errors.password && touched.password && (
            <div 
              className="error-message" 
              id="password-error"
              aria-live="polite"
            >
              {errors.password}
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          variant="primary"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? 'Entrando...' : 'Entrar'}
        </Button>
        
        {submitted && (
          <div className="success-message" aria-live="polite">
            Login realizado com sucesso!
          </div>
        )}
      </form>
    </Announcer>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func
};

export default LoginForm; 