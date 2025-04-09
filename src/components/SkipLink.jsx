import React from 'react';
import PropTypes from 'prop-types';
import { SKIP_LINK_Z_INDEX } from '../config/accessibility';

const SkipLink = ({ targetId, children = 'Pular para o conteúdo principal' }) => {
  const style = {
    position: 'absolute',
    top: '-40px',
    left: 0,
    backgroundColor: '#2c5282',
    color: 'white',
    padding: '8px 16px',
    zIndex: SKIP_LINK_Z_INDEX,
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'top 0.2s ease',
    ':focus': {
      top: 0,
      outline: 'none',
      boxShadow: '0 0 0 3'
    }
  };

  return (
    <a href={`#${targetId}`} style={style} tabIndex="0">
      {children}
    </a>
  );
};

SkipLink.propTypes = {
  targetId: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default SkipLink; 