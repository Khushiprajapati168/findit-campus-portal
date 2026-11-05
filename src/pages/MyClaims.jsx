import React, { useState } from 'react';
import {
  IconCheckCircle,
  IconXCircle,
  IconClock,
  IconShield,
  IconEye,
  IconUser,
  IconMail,
  IconFileText,
  IconRotate
} from '../components/Icons';

export const MyClaims = ({
  claims = [],
  onUpdateClaimStatus,
  onViewItemDetails,
  navigate
}) => {
  const [selectedClaimId, setSelectedClaimId] = useState(null);
  const [demoAdminMode, setDemoAdminMode] = useState(true); // default on for easy evaluation!
  const [statusFilter, setStatusFilter] = useState('all');
  const [adminNoteInput, setAdminNoteInput] = useState('');

  const filteredClaims = claims.filter((claim) => {
    if (statusFilter === 'all') return true;
    return claim.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="badge badge-approved">
            <IconCheckCircle size={14} />
            <span>Approved</span>
          </span>
        );
      case 'Rejected':
        return (
          <span className="badge badge-rejected">
            <IconXCircle size={14} />
            <span>Rejected</span>
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="badge badge-pending">
            <IconClock size={14} />
            <span>Pending Review</span>
          </span>
        );
    }
  };

  const handleAction = (claimId, newStatus) => {
    onUpdateClaimStatus(claimId, newStatus, adminNoteInput);
    setAdminNoteInput('');
  };

  return (
    <div className="claims-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Item Claim Tracking &amp; Resolution</h1>
          <p className="page-subtitle">
            Track submitted property verification claims, review evidence, and monitor campus admin decisions.
          </p>
        </div>

        {/* Demo Admin Mode Toggle */}
        <div className="demo-admin-badge-box">
          <div className="admin-toggle-wrapper">
            <label className="toggle-label" htmlFor="admin-mode-toggle">
              <span className="admin-indicator-dot"></span>
              <strong>Demo Evaluator Admin Mode:</strong>
            </label>
            <input
              id="admin-mode-toggle"
              type="checkbox"
              checked={demoAdminMode}
              onChange={(e) => setDemoAdminMode(e.target.checked)}
              className="toggle-checkbox"
            />
          </div>
          <span className="demo-subtext">Toggle controls to test approving / rejecting claims during viva</span>
        </div>
      </div>

      {/* Demo Evaluation Notice Banner */}
      {demoAdminMode && (
        <div className="notice-box info admin-eval-notice">
          <IconShield size={20} />
          <div>
            <strong>College Project Viva Note:</strong>
            <p>
              In a full production deployment, the approval buttons below would be restricted to authenticated College Security or Proctor officers via secure backend JWT authentication. For this frontend-only academic evaluation, controls are provided directly to demonstrate the state transition flow between <em>Pending</em>, <em>Approved</em>, and <em>Rejected</em> states in localStorage.
            </p>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="claims-filter-bar">
        <div className="pill-group">
          <button
            className={`pill-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All Claims ({claims.length})
          </button>
          <button
            className={`pill-btn ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            Pending ({claims.filter((c) => c.status === 'Pending').length})
          </button>
          <button
            className={`pill-btn ${statusFilter === 'approved' ? 'active' : ''}`}
            onClick={() => setStatusFilter('approved')}
          >
            Approved ({claims.filter((c) => c.status === 'Approved').length})
          </button>
          <button
            className={`pill-btn ${statusFilter === 'rejected' ? 'active' : ''}`}
            onClick={() => setStatusFilter('rejected')}
          >
            Rejected ({claims.filter((c) => c.status === 'Rejected').length})
          </button>
        </div>
      </div>

      {/* Claims List */}
      {filteredClaims.length > 0 ? (
        <div className="claims-list">
          {filteredClaims.map((claim) => {
            const isExpanded = selectedClaimId === claim.claimId;
            return (
              <div key={claim.claimId} className="claim-card">
                <div className="claim-card-main">
                  <div className="claim-card-left">
                    <div className="claim-id-badge">{claim.claimId}</div>
                    <div className="claim-item-meta">
                      <h3 className="claim-item-title">{claim.itemName}</h3>
                      <div className="claim-sub-info">
                        <span>Submitted by: <strong>{claim.claimantName}</strong> ({claim.claimantEmail})</span>
                        <span>•</span>
                        <span>Date: {claim.submittedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="claim-card-right">
                    <div className="claim-status-box">
                      {getStatusBadge(claim.status)}
                    </div>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setSelectedClaimId(isExpanded ? null : claim.claimId)}
                    >
                      <IconEye size={15} />
                      <span>{isExpanded ? 'Hide Details' : 'View Proof & Notes'}</span>
                    </button>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="claim-expanded-content">
                    <div className="claim-details-grid">
                      {/* Left: Claim Proof */}
                      <div className="proof-box">
                        <h4 className="detail-heading">
                          <IconFileText size={16} />
                          <span>Submitted Proof of Ownership</span>
                        </h4>
                        <div className="proof-text-container">
                          <p>{claim.proofDescription}</p>
                        </div>
                        {claim.phone && (
                          <div className="claim-contact-pill">
                            <span>Phone: {claim.phone}</span>
                          </div>
                        )}
                      </div>

                      {/* Right: Admin Notes & Resolution Controls */}
                      <div className="admin-status-box">
                        <h4 className="detail-heading">
                          <IconShield size={16} />
                          <span>Administrative Verification Status</span>
                        </h4>

                        <div className="admin-note-display">
                          <strong>Admin Remarks:</strong>
                          <p>{claim.adminNote || 'No review remarks recorded yet.'}</p>
                        </div>

                        {demoAdminMode && (
                          <div className="admin-controls-action-bar">
                            <label className="admin-input-label">Update Status &amp; Add Admin Note:</label>
                            <input
                              type="text"
                              className="form-input form-input-sm"
                              placeholder="e.g. Verified with student ID card CS-23-089"
                              value={adminNoteInput}
                              onChange={(e) => setAdminNoteInput(e.target.value)}
                            />

                            <div className="admin-buttons-row">
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleAction(claim.claimId, 'Approved')}
                                disabled={claim.status === 'Approved'}
                              >
                                <IconCheckCircle size={15} />
                                <span>Approve Claim</span>
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleAction(claim.claimId, 'Rejected')}
                                disabled={claim.status === 'Rejected'}
                              >
                                <IconXCircle size={15} />
                                <span>Reject Claim</span>
                              </button>
                              {claim.status !== 'Pending' && (
                                <button
                                  className="btn btn-outline btn-sm"
                                  onClick={() => handleAction(claim.claimId, 'Pending')}
                                >
                                  <IconRotate size={14} />
                                  <span>Reset to Pending</span>
                                </button>
                              )}
                            </div>
                          </div>
                        )}
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
          <IconClock size={36} className="empty-state-icon" />
          <h3 className="empty-state-title">No claims found in this category</h3>
          <p className="empty-state-desc">
            You haven't submitted any ownership claims yet, or no claims match your current filter.
          </p>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate('items', { type: 'found' })}
          >
            Browse Found Items to Claim
          </button>
        </div>
      )}
    </div>
  );
};
