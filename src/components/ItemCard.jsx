import React from 'react';
import { IconMapPin, IconCalendar, IconTag, IconEye, IconSparkles } from './Icons';

export const ItemCard = ({ item, onViewDetails }) => {
  const isFound = item.type === 'found';
  const isClaimed = item.status === 'claimed' || item.status === 'returned';

  return (
    <div className={`item-card ${isFound ? 'type-found' : 'type-lost'}`}>
      {/* Thumbnail Container */}
      <div className="card-image-box" onClick={() => onViewDetails(item.id)}>
        <img
          src={item.image}
          alt={item.name}
          className="card-image"
          loading="lazy"
          onError={(e) => {
            // Fallback placeholder if image string failed
            e.target.onerror = null;
            e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" fill="%23e2e8f0"><rect width="100%" height="100%"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2364748b" font-family="sans-serif" font-size="20">Item Image</text></svg>';
          }}
        />

        {/* Top Badges */}
        <div className="card-top-badges">
          <span className={`badge ${isFound ? 'badge-found' : 'badge-lost'}`}>
            {isFound ? 'Found Item' : 'Lost Item'}
          </span>
          {isClaimed && (
            <span className="badge badge-claimed">
              Reunited
            </span>
          )}
          {item.isDemo && (
            <span className="badge badge-demo" title="Sample college listing">
              Demo
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="card-content">
        <div className="card-category-pill">
          <IconTag size={12} />
          <span>{item.category}</span>
        </div>

        <h3 className="card-title" onClick={() => onViewDetails(item.id)} title={item.name}>
          {item.name}
        </h3>

        <p className="card-desc">
          {item.description}
        </p>

        {/* Meta row */}
        <div className="card-meta">
          <div className="meta-item" title={`Location: ${item.location}`}>
            <IconMapPin size={14} className="meta-icon" />
            <span className="meta-text">{item.location}</span>
          </div>
          <div className="meta-item" title={`Reported on: ${item.date}`}>
            <IconCalendar size={14} className="meta-icon" />
            <span className="meta-text">{item.date}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="card-footer-action">
          <button
            className="btn btn-outline btn-sm btn-block"
            onClick={() => onViewDetails(item.id)}
          >
            <IconEye size={15} />
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};
