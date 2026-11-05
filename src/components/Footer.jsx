import React from 'react';
import { IconShield, IconRotate, IconCheckCircle } from './Icons';

export const Footer = ({ navigate, onResetDemo }) => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: Brand & About */}
          <div className="footer-col brand-col">
            <div className="brand" onClick={() => navigate('home')} role="button" tabIndex={0}>
              <div className="brand-logo-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
            <p className="footer-desc">
              A student-first smart Lost &amp; Found web portal built to connect honest finders with worried owners across campus facilities, classrooms, labs, and sports grounds.
            </p>
            <div className="tech-badge">
              <span>Academic Web Tech Project • React + Vite</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li><button onClick={() => navigate('home')}>Home</button></li>
              <li><button onClick={() => navigate('items')}>Browse All Items</button></li>
              <li><button onClick={() => navigate('items', { type: 'lost' })}>Lost Items</button></li>
              <li><button onClick={() => navigate('items', { type: 'found' })}>Found Items</button></li>
              <li><button onClick={() => navigate('my-claims')}>Claim Tracking</button></li>
              <li><button onClick={() => navigate('my-reports')}>My Reported Listings</button></li>
            </ul>
          </div>

          {/* Column 3: Campus Safe Zones */}
          <div className="footer-col">
            <h4 className="footer-heading">Campus Drop-Off Points</h4>
            <ul className="footer-info-list">
              <li>
                <strong>Central Security Post:</strong>
                <span>Main Gate 1 • Open 24/7</span>
              </li>
              <li>
                <strong>Central Library Reception:</strong>
                <span>Ground Floor • 8:00 AM – 9:00 PM</span>
              </li>
              <li>
                <strong>Student Affairs Office:</strong>
                <span>Admin Block, Room 104 • Mon–Fri</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Demo & Privacy Controls */}
          <div className="footer-col">
            <h4 className="footer-heading">Project Demo Tools</h4>
            <p className="footer-note">
              This demo runs locally in your browser using <code>localStorage</code>. Data persists across reloads on this machine.
            </p>
            <button
              onClick={onResetDemo}
              className="btn btn-outline btn-xs footer-reset-btn"
              title="Reset items and claims back to initial college sample data"
            >
              <IconRotate size={14} />
              <span>Reset Demo Data</span>
            </button>
            <div className="security-notice">
              <IconShield size={14} />
              <span>Never exchange valuables alone after dark. Always meet at campus security.</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} FindIt Campus Portal. Developed for College Web Technology Examination.</p>
          <div className="footer-bottom-links">
            <button onClick={() => navigate('about')}>About Project</button>
            <span>•</span>
            <button onClick={() => navigate('about')}>Safety Guidelines</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
