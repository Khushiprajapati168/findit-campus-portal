import React, { useState } from 'react';
import {
  IconTrash,
  IconEye,
  IconCheckCircle,
  IconPlus,
  IconTag,
  IconMapPin,
  IconCalendar,
  IconAlertCircle
} from '../components/Icons';

export const MyReports = ({
  items = [],
  onDeleteListing,
  onToggleStatus,
  onViewDetails,
  navigate
}) => {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'lost' | 'found'
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const filteredItems = items.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const handleDelete = (id) => {
    onDeleteListing(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="reports-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">My Reported Listings</h1>
          <p className="page-subtitle">
            Manage listings you have posted on campus. Update statuses when resolved or remove listings.
          </p>
        </div>

        <div className="header-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate('report-lost')}
          >
            <IconPlus size={16} />
            <span>Post New Listing</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="type-tabs-bar">
        <button
          className={`type-tab ${filterType === 'all' ? 'active' : ''}`}
          onClick={() => setFilterType('all')}
        >
          All My Reports ({items.length})
        </button>
        <button
          className={`type-tab ${filterType === 'lost' ? 'active' : ''}`}
          onClick={() => setFilterType('lost')}
        >
          Lost Items ({items.filter((i) => i.type === 'lost').length})
        </button>
        <button
          className={`type-tab ${filterType === 'found' ? 'active' : ''}`}
          onClick={() => setFilterType('found')}
        >
          Found Items ({items.filter((i) => i.type === 'found').length})
        </button>
      </div>

      {/* Reports Table / Card List */}
      {filteredItems.length > 0 ? (
        <div className="reports-grid">
          {filteredItems.map((item) => {
            const isFound = item.type === 'found';
            const isResolved = item.status === 'claimed' || item.status === 'returned';

            return (
              <div key={item.id} className="report-item-card">
                <div className="report-card-image-box">
                  <img src={item.image} alt={item.name} className="report-thumb" />
                  <span className={`badge ${isFound ? 'badge-found' : 'badge-lost'}`}>
                    {isFound ? 'Found' : 'Lost'}
                  </span>
                </div>

                <div className="report-card-body">
                  <div className="report-card-header">
                    <span className="report-category">{item.category}</span>
                    <span className="report-id">Ref: #{item.id}</span>
                  </div>

                  <h3 className="report-item-title" onClick={() => onViewDetails(item.id)}>
                    {item.name}
                  </h3>

                  <p className="report-desc-preview">{item.description}</p>

                  <div className="report-meta-row">
                    <div className="report-meta-item">
                      <IconMapPin size={13} />
                      <span>{item.location}</span>
                    </div>
                    <div className="report-meta-item">
                      <IconCalendar size={13} />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  <div className="report-status-bar">
                    <span className="status-label">Listing Status:</span>
                    <span className={`badge ${isResolved ? 'badge-claimed' : 'badge-pending'}`}>
                      {isResolved ? 'Reunited / Resolved' : 'Active Listing'}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="report-actions-row">
                    <button
                      className="btn btn-outline btn-xs"
                      onClick={() => onViewDetails(item.id)}
                    >
                      <IconEye size={13} />
                      <span>View</span>
                    </button>

                    <button
                      className={`btn btn-xs ${isResolved ? 'btn-outline' : 'btn-success'}`}
                      onClick={() => onToggleStatus(item.id, isResolved ? 'active' : 'returned')}
                      title="Mark as returned to owner"
                    >
                      <IconCheckCircle size={13} />
                      <span>{isResolved ? 'Reopen Listing' : 'Mark Reunited'}</span>
                    </button>

                    <button
                      className="btn btn-danger-outline btn-xs"
                      onClick={() => setDeleteConfirmId(item.id)}
                      title="Permanently remove this listing"
                    >
                      <IconTrash size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

                {/* Delete Confirmation Modal / Banner */}
                {deleteConfirmId === item.id && (
                  <div className="delete-confirm-overlay">
                    <div className="delete-confirm-box">
                      <IconAlertCircle size={22} className="alert-icon-red" />
                      <h4>Delete Listing?</h4>
                      <p>Are you sure you want to delete "{item.name}" from the portal?</p>
                      <div className="delete-btns">
                        <button
                          className="btn btn-outline btn-xs"
                          onClick={() => setDeleteConfirmId(null)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-danger btn-xs"
                          onClick={() => handleDelete(item.id)}
                        >
                          Confirm Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-state-box">
          <IconTag size={36} className="empty-state-icon" />
          <h3 className="empty-state-title">No listings recorded yet</h3>
          <p className="empty-state-desc">
            You haven't reported any lost or found belongings under this filter yet.
          </p>
          <div className="empty-actions">
            <button
              className="btn btn-outline btn-sm"
              onClick={() => navigate('report-lost')}
            >
              Report Lost Item
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate('report-found')}
            >
              Report Found Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
