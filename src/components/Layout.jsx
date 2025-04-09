import React from 'react';
import PropTypes from 'prop-types';
import SkipLink from './SkipLink';

const Layout = ({ children }) => {
  return (
    <>
      <SkipLink targetId="main-content" />
      <header>
        {/* Conteúdo do cabeçalho */}
      </header>
      <main id="main-content" tabIndex="-1">
        {children}
      </main>
      <footer>
        {/* Conteúdo do rodapé */}
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout; 