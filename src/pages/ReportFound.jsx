import React, { useState } from 'react';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data/mockData';
import { compressImage } from '../data/storage';
import {
  IconUpload,
  IconX,
  IconCheckCircle,
  IconAlertCircle,
  IconArrowLeft,
  IconTag,
  IconMapPin,
  IconShield
} from '../components/Icons';

export const ReportFound = ({ onSubmitItem, navigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    custodyLocation: 'I currently have it with me',
    reporterName: '',
    reporterEmail: '',
    phone: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, image: 'Please select an image file (PNG, JPG, JPEG).' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: 'Image file is too large. Max size is 5MB.' }));
      return;
    }

    try {
      const compressedDataUrl = await compressImage(file, 800, 0.7);
      setImagePreview(compressedDataUrl);
      setFormData((prev) => ({ ...prev, image: compressedDataUrl }));
      setErrors((prev) => ({ ...prev, image: null }));
    } catch (err) {
      console.error('Image compression error:', err);
      setErrors((prev) => ({ ...prev, image: 'Failed to process image. Try another file.' }));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Item name is required.';
    if (!formData.category) errs.category = 'Please select a category.';
    if (!formData.location) errs.location = 'Please select where you found the item.';
    if (!formData.date) errs.date = 'Date found is required.';
    if (!formData.description.trim()) {
      errs.description = 'Please describe the found item.';
    } else if (formData.description.trim().length < 15) {
      errs.description = 'Description should be at least 15 characters long.';
    }
    if (!formData.reporterName.trim()) {
      errs.reporterName = 'Please enter your name.';
    }
    if (!formData.reporterEmail.trim()) {
      errs.reporterEmail = 'Contact email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.reporterEmail.trim())) {
      errs.reporterEmail = 'Please provide a valid email format.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    let finalImage = formData.image;
    if (!finalImage) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23059669"/><text x="300" y="200" font-family="sans-serif" font-size="28" font-weight="700" fill="%23ffffff" text-anchor="middle">FOUND: ${formData.name}</text><text x="300" y="240" font-family="sans-serif" font-size="18" fill="rgba(255,255,255,0.8)" text-anchor="middle">${formData.category} • ${formData.location}</text></svg>`;
      finalImage = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    }

    const newItem = {
      name: formData.name.trim(),
      type: 'found',
      category: formData.category,
      location: formData.location,
      date: formData.date,
      description: `${formData.description.trim()}${formData.custodyLocation ? ` [Custody Note: ${formData.custodyLocation}]` : ''}`,
      reporterName: formData.reporterName.trim(),
      reporterEmail: formData.reporterEmail.trim(),
      phone: formData.phone.trim(),
      image: finalImage
    };

    setTimeout(() => {
      onSubmitItem(newItem);
      setIsSubmitting(false);
    }, 350);
  };

  return (
    <div className="form-page-container">
      {/* Top Banner */}
      <div className="form-header-card found-header">
        <button className="back-link-btn" onClick={() => navigate('items')}>
          <IconArrowLeft size={16} />
          <span>Back to directory</span>
        </button>
        <span className="badge badge-found">Report Found Property</span>
        <h1 className="form-page-title">Report a Found Item</h1>
        <p className="form-page-desc">
          Thank you for your honesty! Posting details of an item you recovered helps reunite it quickly with its worried owner.
        </p>
      </div>

      <div className="form-content-card">
        {/* Good Samaritan Notice */}
        <div className="notice-box success">
          <IconShield size={20} />
          <div>
            <strong>Campus Finder Tip:</strong>
            <p>
              Avoid posting private details (e.g. roll numbers, contents of a wallet, or unlock codes) so that true owners can authenticate themselves during the claim process.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Section 1: Item Details */}
          <div className="form-section-title">
            <IconTag size={18} />
            <span>1. Found Item Information</span>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="found-name">
              Item Name <span className="req">*</span>
            </label>
            <input
              id="found-name"
              type="text"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="e.g. Scientific Calculator, Student ID Card, Wildcraft Backpack"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="found-category">
                Category <span className="req">*</span>
              </label>
              <select
                id="found-category"
                className={`form-select ${errors.category ? 'input-error' : ''}`}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">-- Choose Category --</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <span className="error-text">{errors.category}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="found-date">
                Date Found <span className="req">*</span>
              </label>
              <input
                id="found-date"
                type="date"
                className={`form-input ${errors.date ? 'input-error' : ''}`}
                value={formData.date}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
              {errors.date && <span className="error-text">{errors.date}</span>}
            </div>
          </div>

          {/* Location */}
          <div className="form-group">
            <label className="form-label" htmlFor="found-location">
              Campus Location Where Found <span className="req">*</span>
            </label>
            <select
              id="found-location"
              className={`form-select ${errors.location ? 'input-error' : ''}`}
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            >
              <option value="">-- Choose Campus Location --</option>
              {CAMPUS_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            {errors.location && <span className="error-text">{errors.location}</span>}
          </div>

          {/* Current Custody / Drop-off location */}
          <div className="form-group">
            <label className="form-label" htmlFor="found-custody">
              Current Custody of the Item
            </label>
            <select
              id="found-custody"
              className="form-select"
              value={formData.custodyLocation}
              onChange={(e) => setFormData({ ...formData, custodyLocation: e.target.value })}
            >
              <option value="I currently have it with me safely">I currently have it with me safely</option>
              <option value="Handed over to Central Security Post (Gate 1)">Handed over to Central Security Post (Gate 1)</option>
              <option value="Handed over to Central Library Reception">Handed over to Central Library Reception</option>
              <option value="Handed over to Dept / Lab Assistant">Handed over to Dept / Lab Assistant</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="found-desc">
              Item Description &amp; Condition <span className="req">*</span>
            </label>
            <textarea
              id="found-desc"
              rows={4}
              className={`form-textarea ${errors.description ? 'input-error' : ''}`}
              placeholder="Describe color, general condition, where it was spotted (e.g. bench 4, under desk 12)..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label className="form-label">
              Upload Item Photo <span className="text-muted">(Recommended)</span>
            </label>

            {!imagePreview ? (
              <div className="upload-dropzone">
                <input
                  type="file"
                  id="found-image-file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input-hidden"
                />
                <label htmlFor="found-image-file" className="upload-dropzone-label">
                  <div className="upload-icon-circle upload-green">
                    <IconUpload size={24} />
                  </div>
                  <span className="upload-cta">Click or drag &amp; drop to upload item photo</span>
                  <span className="upload-hint">PNG, JPG, or JPEG</span>
                </label>
              </div>
            ) : (
              <div className="image-preview-container">
                <img src={imagePreview} alt="Preview" className="image-preview" />
                <button
                  type="button"
                  className="preview-remove-btn"
                  onClick={handleRemoveImage}
                  title="Remove image"
                >
                  <IconX size={16} />
                  <span>Remove Image</span>
                </button>
              </div>
            )}
            {errors.image && <span className="error-text">{errors.image}</span>}
          </div>

          <div className="form-divider" />

          {/* Section 2: Contact Information */}
          <div className="form-section-title">
            <IconMapPin size={18} />
            <span>2. Finder Contact Details</span>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="finder-name">
                Your Full Name <span className="req">*</span>
              </label>
              <input
                id="finder-name"
                type="text"
                className={`form-input ${errors.reporterName ? 'input-error' : ''}`}
                placeholder="e.g. Sunil Kumar / Lab Assistant"
                value={formData.reporterName}
                onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
              />
              {errors.reporterName && <span className="error-text">{errors.reporterName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="finder-email">
                Your College / Personal Email <span className="req">*</span>
              </label>
              <input
                id="finder-email"
                type="email"
                className={`form-input ${errors.reporterEmail ? 'input-error' : ''}`}
                placeholder="e.g. sunil.staff@college.edu"
                value={formData.reporterEmail}
                onChange={(e) => setFormData({ ...formData, reporterEmail: e.target.value })}
              />
              {errors.reporterEmail && <span className="error-text">{errors.reporterEmail}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="finder-phone">
              Phone / Extension <span className="text-muted">(Optional)</span>
            </label>
            <input
              id="finder-phone"
              type="tel"
              className="form-input"
              placeholder="e.g. +91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          {/* Submit Actions */}
          <div className="form-submit-row">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('items')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publishing Found Item Report...' : 'Publish Found Item Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
