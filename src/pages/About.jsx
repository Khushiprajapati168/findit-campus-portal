import React from 'react';
import {
  IconShield,
  IconCheckCircle,
  IconMapPin,
  IconFileText,
  IconUser,
  IconSparkles,
  IconArrowRight
} from '../components/Icons';

export const About = ({ navigate }) => {
  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="about-hero">
        <div className="hero-pill center-pill">
          <IconSparkles size={14} />
          <span>College Web Technology Project</span>
        </div>
        <h1 className="about-title">About FindIt Campus Portal</h1>
        <p className="about-lead">
          A modern, transparent, and student-focused web application engineered to bridge the gap between lost belongings and honest finders across campus.
        </p>
      </section>

      {/* Problem & Solution Grid */}
      <section className="about-grid">
        <div className="about-card">
          <div className="about-icon-box icon-red">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h3>The Real-Life Problem</h3>
          <p>
            On a typical university campus, hundreds of items—laptops, college identity cards, lab manuals, earbuds, calculators, and wallets—are misplaced weekly. Students currently rely on cluttered WhatsApp groups, unofficial social media stories, or disorganized notice boards, resulting in high frustration and lost property.
          </p>
        </div>

        <div className="about-card">
          <div className="about-icon-box icon-blue">
            <IconShield size={24} />
          </div>
          <h3>The FindIt Solution</h3>
          <p>
            FindIt replaces chaotic chat feeds with a centralized, searchable campus portal. With instant filtering by campus location and category, student verification proofs, and a structured claim approval system, lost items can be safely returned to their rightful owners within hours.
          </p>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="section about-process-section">
        <div className="section-header text-center">
          <h2 className="section-title">The 4-Step Recovery Workflow</h2>
          <p className="section-subtitle">
            Designed for simplicity, security, and quick campus resolutions.
          </p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3 className="step-title">Report an Item</h3>
            <p className="step-desc">
              Students post detailed descriptions, images, and locations for both lost items and found articles in seconds.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3 className="step-title">Browse &amp; Search</h3>
            <p className="step-desc">
              Browse listings using instant category filters, campus zones (Library, Cafeteria, Labs), and keyword matching.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3 className="step-title">Submit a Claim</h3>
            <p className="step-desc">
              True owners provide confidential proof of ownership (scratches, lock-screen photos, serial numbers, bag contents).
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">4</div>
            <h3 className="step-title">Track &amp; Recover</h3>
            <p className="step-desc">
              Track claim progress live under My Claims, receive approval, and complete secure handoff at designated campus desks.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Guidelines */}
      <section className="safety-section">
        <div className="safety-card">
          <div className="safety-icon">
            <IconShield size={32} />
          </div>
          <div className="safety-content">
            <h3 className="safety-title">Campus Safe Handoff Guidelines</h3>
            <ul className="safety-points">
              <li>
                <strong>Always Meet in Public:</strong> Coordinate property handoffs at high-visibility campus locations such as the Central Library Information Desk or Main Gate Security Post.
              </li>
              <li>
                <strong>Never Disclose Secret Details Publicly:</strong> Finders should not post serial numbers or photos of open wallet contents so claimants must supply proof.
              </li>
              <li>
                <strong>Check Student ID:</strong> Before returning high-value electronics (laptops, phones), verify the student's college identity card matches the claim details.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Project Viva & Architecture Section */}
      <section className="section tech-specs-section">
        <div className="section-header text-center">
          <h2 className="section-title">Technical Project Architecture</h2>
          <p className="section-subtitle">
            Clean, modular, and beginner-friendly web stack built for viva evaluation.
          </p>
        </div>

        <div className="tech-specs-grid">
          <div className="tech-card">
            <h4>Component-Driven React</h4>
            <p>
              Modular UI architecture separated into clean components (Navbar, ItemCard, SearchBar, FilterSection, ClaimModal) and specialized pages.
            </p>
          </div>
          <div className="tech-card">
            <h4>State &amp; Client-Side Routing</h4>
            <p>
              Clean React <code>useState</code> and <code>useEffect</code> lifecycle hooks managing active views, search queries, multi-filter criteria, and claim statuses.
            </p>
          </div>
          <div className="tech-card">
            <h4>Browser LocalStorage Persistence</h4>
            <p>
              Robust browser data persistence using <code>localStorage</code> with structured schema, error handling, image compression, and demo data reset.
            </p>
          </div>
          <div className="tech-card">
            <h4>Pure CSS3 Design System</h4>
            <p>
              Hand-crafted professional CSS with custom color palettes, responsive flexbox &amp; grid layouts, smooth micro-interactions, and zero bloated CSS frameworks.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="section-header text-center">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Common questions about the FindIt campus portal.</p>
        </div>

        <div className="faq-grid">
          <div className="faq-item">
            <h4>How do I prove an item belongs to me?</h4>
            <p>
              When claiming a found item, provide distinguishing details that only the true owner would know, such as lock screen wallpaper, specific scratches, unique keychains, or contents of inside pockets.
            </p>
          </div>

          <div className="faq-item">
            <h4>Can I claim an item that I reported myself?</h4>
            <p>
              No, the system strictly validates that a reporter's email cannot be used to submit a claim on their own listing, preventing self-claim loops and fraudulent activity.
            </p>
          </div>

          <div className="faq-item">
            <h4>Where is my data stored in this demo?</h4>
            <p>
              All item listings and claims are stored locally in your browser's <code>localStorage</code>. Data persists across browser refreshes on this computer without needing an external database.
            </p>
          </div>

          <div className="faq-item">
            <h4>What should I do if I find a student ID card?</h4>
            <p>
              Report it immediately under the "ID Cards" category and hand the physical card to the Central Security Post or the Dean of Student Welfare office.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="about-bottom-cta">
        <h2>Ready to Explore Campus Listings?</h2>
        <p>Search reported items or post a lost/found listing now.</p>
        <div className="cta-buttons">
          <button className="btn btn-primary" onClick={() => navigate('items')}>
            Browse All Items
          </button>
          <button className="btn btn-outline" onClick={() => navigate('report-lost')}>
            Report Lost Item
          </button>
        </div>
      </div>
    </div>
  );
};
