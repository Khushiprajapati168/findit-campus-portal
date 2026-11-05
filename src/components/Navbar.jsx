import React, { useState } from 'react';
import { IconSearch, IconPlus, IconShield } from './Icons';

export const Navbar = ({ currentView, navigate, claimsCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view, params = {}) => {
    navigate(view, params);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="brand" onClick={() => handleNav('home')} role="button" tabIndex={0}>
          <div className="brand-logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <path d="M11 8v6"></path>
              <path d="M8 11h6"></path>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">Find<span className="brand-accent">It</span></span>
            <span className="brand-tag">Campus Portal</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <button
            className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            Home
          </button>
          <button
            className={`nav-link ${currentView === 'items' ? 'active' : ''}`}
            onClick={() => handleNav('items')}
          >
            Browse Items
          </button>
          <button
            className={`nav-link ${currentView === 'report-lost' ? 'active' : ''}`}
            onClick={() => handleNav('report-lost')}
          >
            Report Lost
          </button>
          <button
            className={`nav-link ${currentView === 'report-found' ? 'active' : ''}`}
            onClick={() => handleNav('report-found')}
          >
            Report Found
          </button>
          <button
            className={`nav-link ${currentView === 'my-claims' ? 'active' : ''}`}
            onClick={() => handleNav('my-claims')}
          >
            Track Claims
            {claimsCount > 0 && <span className="nav-badge">{claimsCount}</span>}
          </button>
          <button
            className={`nav-link ${currentView === 'my-reports' ? 'active' : ''}`}
            onClick={() => handleNav('my-reports')}
          >
            My Reports
          </button>
          <button
            className={`nav-link ${currentView === 'about' ? 'active' : ''}`}
            onClick={() => handleNav('about')}
          >
            About
          </button>
        </nav>

        {/* Action Button */}
        <div className="navbar-actions">
          <button
            className="btn btn-primary btn-sm btn-icon"
            onClick={() => handleNav('items')}
            title="Search and browse all items"
          >
            <IconSearch size={15} />
            <span>Search</span>
          </button>
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <button
            className={`mobile-nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            Home
          </button>
          <button
            className={`mobile-nav-link ${currentView === 'items' ? 'active' : ''}`}
            onClick={() => handleNav('items')}
          >
            Browse All Items
          </button>
          <button
            className={`mobile-nav-link ${currentView === 'report-lost' ? 'active' : ''}`}
            onClick={() => handleNav('report-lost')}
          >
            Report Lost Item
          </button>
          <button
            className={`mobile-nav-link ${currentView === 'report-found' ? 'active' : ''}`}
            onClick={() => handleNav('report-found')}
          >
            Report Found Item
          </button>
          <button
            className={`mobile-nav-link ${currentView === 'my-claims' ? 'active' : ''}`}
            onClick={() => handleNav('my-claims')}
          >
            Track Claims ({claimsCount})
          </button>
          <button
            className={`mobile-nav-link ${currentView === 'my-reports' ? 'active' : ''}`}
            onClick={() => handleNav('my-reports')}
          >
            My Reports
          </button>
          <button
            className={`mobile-nav-link ${currentView === 'about' ? 'active' : ''}`}
            onClick={() => handleNav('about')}
          >
            About FindIt
          </button>
        </div>
      )}
    </header>
  );
};
