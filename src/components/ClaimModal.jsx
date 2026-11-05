import React, { useState } from 'react';
import { IconX, IconShield, IconCheckCircle, IconAlertCircle } from './Icons';

export const ClaimModal = ({ item, isOpen, onClose, onSubmitClaim }) => {
  const [formData, setFormData] = useState({
    claimantName: '',
    claimantEmail: '',
    studentId: '',
    phone: '',
    proofDescription: '',
    confirmedTruthful: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !item) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.claimantName.trim()) {
      newErrors.claimantName = 'Please enter your full name.';
    }
    if (!formData.claimantEmail.trim()) {
      newErrors.claimantEmail = 'Please provide your college or personal email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.claimantEmail.trim())) {
      newErrors.claimantEmail = 'Please provide a valid email address.';
    }

    // Check if claimant email matches reporter email (cannot claim your own reported item)
    if (
      item.reporterEmail &&
      formData.claimantEmail.trim().toLowerCase() === item.reporterEmail.trim().toLowerCase()
    ) {
      newErrors.claimantEmail = 'You cannot submit a claim for an item you reported yourself.';
    }

    if (!formData.proofDescription.trim()) {
      newErrors.proofDescription = 'Detailed proof of ownership is required.';
    } else if (formData.proofDescription.trim().length < 20) {
      newErrors.proofDescription = 'Please provide at least 20 characters explaining specific details only the true owner would know.';
    }

    if (!formData.confirmedTruthful) {
      newErrors.confirmedTruthful = 'You must confirm that this is your genuine property.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate short network delay for realistic UX
    setTimeout(() => {
      onSubmitClaim({
        itemId: item.id,
        itemName: item.name,
        claimantName: formData.claimantName.trim(),
        claimantEmail: formData.claimantEmail.trim(),
        studentId: formData.studentId.trim() || 'N/A',
        phone: formData.phone.trim() || 'N/A',
        proofDescription: formData.proofDescription.trim()
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Submit Ownership Claim</h3>
            <p className="modal-subtitle">
              Claiming: <strong>{item.name}</strong> ({item.location})
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <IconX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="modal-body">
          {/* Item summary banner */}
          <div className="modal-item-summary">
            <img src={item.image} alt={item.name} className="modal-thumb" />
            <div className="modal-item-info">
              <span className="summary-cat">{item.category}</span>
              <h4 className="summary-name">{item.name}</h4>
              <p className="summary-loc">Found at: {item.location} on {item.date}</p>
            </div>
          </div>

          <div className="notice-box info">
            <IconShield size={18} />
            <p>
              To protect student belongings, claims must be verified by the finder or campus authority. Provide identifying marks (stickers, serial numbers, passwords, inside contents) not visible in the public photo.
            </p>
          </div>

          {/* Form fields */}
          <div className="form-group">
            <label className="form-label" htmlFor="claimant-name">
              Your Full Name <span className="req">*</span>
            </label>
            <input
              id="claimant-name"
              type="text"
              className={`form-input ${errors.claimantName ? 'input-error' : ''}`}
              placeholder="e.g. Rahul Verma"
              value={formData.claimantName}
              onChange={(e) => setFormData({ ...formData, claimantName: e.target.value })}
            />
            {errors.claimantName && <span className="error-text">{errors.claimantName}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="claimant-email">
                College / Personal Email <span className="req">*</span>
              </label>
              <input
                id="claimant-email"
                type="email"
                className={`form-input ${errors.claimantEmail ? 'input-error' : ''}`}
                placeholder="e.g. rahul.v@college.edu"
                value={formData.claimantEmail}
                onChange={(e) => setFormData({ ...formData, claimantEmail: e.target.value })}
              />
              {errors.claimantEmail && <span className="error-text">{errors.claimantEmail}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="claimant-phone">
                Phone Number (Optional)
              </label>
              <input
                id="claimant-phone"
                type="tel"
                className="form-input"
                placeholder="e.g. +91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="claim-proof">
              Proof of Ownership Description <span className="req">*</span>
            </label>
            <textarea
              id="claim-proof"
              rows={4}
              className={`form-textarea ${errors.proofDescription ? 'input-error' : ''}`}
              placeholder="Describe unique identifiers only the true owner would know: e.g. wallpaper on phone, brand/color of contents inside bag, scratch marks, exact notes written on page 1, serial number..."
              value={formData.proofDescription}
              onChange={(e) => setFormData({ ...formData, proofDescription: e.target.value })}
            />
            {errors.proofDescription && (
              <span className="error-text">{errors.proofDescription}</span>
            )}
            <span className="helper-text">
              Min 20 characters. Be as specific as possible.
            </span>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.confirmedTruthful}
                onChange={(e) => setFormData({ ...formData, confirmedTruthful: e.target.checked })}
              />
              <span>
                I hereby declare that I am the genuine owner of this item. I understand that fraudulent claims are subject to college disciplinary action.
              </span>
            </label>
            {errors.confirmedTruthful && (
              <span className="error-text">{errors.confirmedTruthful}</span>
            )}
          </div>

          {/* Modal Footer */}
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting Claim...' : 'Submit Claim Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
