import React from 'react';
import {
  IconArrowLeft,
  IconMapPin,
  IconCalendar,
  IconTag,
  IconUser,
  IconMail,
  IconShield,
  IconHand,
  IconCheckCircle,
  IconAlertCircle
} from '../components/Icons';

export const ItemDetails = ({ item, onBack, onOpenClaim, navigate }) => {
  if (!item) {
    return (
      <div className="item-details-page">
        <div className="empty-state-box">
          <IconAlertCircle size={40} className="empty-icon-error" />
          <h2 className="empty-state-title">Item Not Found</h2>
          <p className="empty-state-desc">The requested item listing could not be located or has been deleted.</p>
          <button className="btn btn-primary" onClick={onBack}>
            <IconArrowLeft size={16} />
            <span>Return to Listings</span>
          </button>
        </div>
      </div>
    );
  }

  const isFound = item.type === 'found';
  const isClaimed = item.status === 'claimed' || item.status === 'returned';

  return (
    <div className="item-details-page">
      {/* Top back navigation */}
      <div className="details-top-bar">
        <button className="back-btn" onClick={onBack}>
          <IconArrowLeft size={18} />
          <span>Back to Listings</span>
        </button>

        <div className="details-header-badges">
          <span className={`badge ${isFound ? 'badge-found' : 'badge-lost'}`}>
            {isFound ? 'Found Item' : 'Lost Item'}
          </span>
          {isClaimed && (
            <span className="badge badge-claimed">
              Item Reunited / Returned
            </span>
          )}
          {item.isDemo && (
            <span className="badge badge-demo">Sample College Listing</span>
          )}
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="details-grid">
        {/* Left Column: Big Image Display */}
        <div className="details-image-card">
          <div className="details-image-wrapper">
            <img
              src={item.image}
              alt={item.name}
              className="details-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" fill="%23e2e8f0"><rect width="100%" height="100%"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2364748b" font-family="sans-serif" font-size="20">Item Image</text></svg>';
              }}
            />
          </div>

          {/* Quick Security & Integrity Box */}
          <div className="details-security-card">
            <div className="security-card-header">
              <IconShield size={20} />
              <h4>Safe Campus Exchange Protocol</h4>
            </div>
            <p>
              Always verify identifying proofs before handing over property. Conduct all physical handovers in public areas such as the Library Front Desk or Central Security Gate.
            </p>
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="details-info-card">
          <div className="details-category-row">
            <span className="details-category-pill">
              <IconTag size={14} />
              {item.category}
            </span>
            <span className="details-item-id">Ref ID: #{item.id}</span>
          </div>

          <h1 className="details-title">{item.name}</h1>

          {/* Location and Date Highlights */}
          <div className="details-highlight-row">
            <div className="highlight-item">
              <div className="highlight-icon">
                <IconMapPin size={18} />
              </div>
              <div className="highlight-text">
                <span className="highlight-label">
                  {isFound ? 'Found Location' : 'Lost Location'}
                </span>
                <span className="highlight-val">{item.location}</span>
              </div>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon">
                <IconCalendar size={18} />
              </div>
              <div className="highlight-text">
                <span className="highlight-label">Reported Date</span>
                <span className="highlight-val">{item.date}</span>
              </div>
            </div>
          </div>

          {/* Item Description */}
          <div className="details-section">
            <h3 className="section-subtitle-heading">Detailed Description</h3>
            <p className="details-description-text">{item.description}</p>
          </div>

          {/* Reported By Info Card */}
          <div className="reporter-info-card">
            <h4 className="reporter-heading">Reported By</h4>
            <div className="reporter-details">
              <div className="reporter-row">
                <IconUser size={16} />
                <span>{item.reporterName || 'Anonymous Student'}</span>
              </div>
              <div className="reporter-row">
                <IconMail size={16} />
                <a href={`mailto:${item.reporterEmail}`} className="reporter-email-link">
                  {item.reporterEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="details-cta-box">
            {isFound ? (
              isClaimed ? (
                <div className="claimed-banner">
                  <IconCheckCircle size={20} />
                  <div>
                    <strong>This item has already been claimed &amp; resolved.</strong>
                    <p>The student owner has verified ownership and reclaimed this item.</p>
                  </div>
                </div>
              ) : (
                <div className="claim-action-group">
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    onClick={() => onOpenClaim(item)}
                  >
                    <IconHand size={20} />
                    <span>Claim This Item</span>
                  </button>
                  <p className="cta-help-text">
                    Believe this item is yours? Click above to provide proof of ownership.
                  </p>
                </div>
              )
            ) : (
              <div className="lost-info-box">
                <div className="lost-info-header">
                  <IconAlertCircle size={20} />
                  <h4>Have you seen or found this item?</h4>
                </div>
                <p>
                  Please email the student directly at{' '}
                  <a href={`mailto:${item.reporterEmail}`}>{item.reporterEmail}</a>{' '}
                  or drop off the item at the Central Security Gate quoting Ref ID <strong>#{item.id}</strong>.
                </p>
                <button
                  className="btn btn-secondary btn-block mt-3"
                  onClick={() => navigate('report-found')}
                >
                  Report That You Found It
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
