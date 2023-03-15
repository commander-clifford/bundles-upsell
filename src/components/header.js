import React from 'react';
import Breadcrumbs from './breadcrumbs';

export default function Header(props) {
  return (
    <header id="page-header">
        <Breadcrumbs {...props} />
        <div className="logo-container">
            <i className="xfinity-logo"></i>
            <i className="logo-separator"></i>
            <i className="netflix-logo logo-white"></i>
        </div>
    </header>
  )
}
