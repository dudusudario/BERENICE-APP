import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../hooks/useFocusTrap';
import Button from './Button';

const Dialog = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  ariaDescribedby,
  size = 'medium',
  closeOnEscape = true,
  closeOnBackdropClick = true
}) => {
  const dialogRef = useFocusTrap(isOpen);

  return (
    <div>
      {/* Renderização do conteúdo do dialog */}
    </div>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node,
  ariaDescribedby: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  closeOnEscape: PropTypes.bool,
  closeOnBackdropClick: PropTypes.bool
};

export default Dialog; 