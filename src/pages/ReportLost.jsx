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
  IconMapPin
} from '../components/Icons';

export const ReportLost = ({ onSubmitItem, navigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
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

    // Size limit check (max 5MB file before compression)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: 'Image file is too large. Max size is 5MB.' }));
      return;
    }

    try {
      // Compress in browser canvas to save localStorage space
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
    if (!formData.location) errs.location = 'Please select the last known location.';
    if (!formData.date) errs.date = 'Date lost is required.';
    if (!formData.description.trim()) {
      errs.description = 'Please describe your item in detail.';
    } else if (formData.description.trim().length < 15) {
      errs.description = 'Description should be at least 15 characters long.';
    }
    if (!formData.reporterName.trim()) {
      errs.reporterName = 'Please enter your student name.';
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

    // If no image uploaded, provide a nice SVG category illustration
    let finalImage = formData.image;
    if (!finalImage) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23dc2626"/><text x="300" y="200" font-family="sans-serif" font-size="28" font-weight="700" fill="%23ffffff" text-anchor="middle">LOST: ${formData.name}</text><text x="300" y="240" font-family="sans-serif" font-size="18" fill="rgba(255,255,255,0.8)" text-anchor="middle">${formData.category} • ${formData.location}</text></svg>`;
      finalImage = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    }

    const newItem = {
      name: formData.name.trim(),
      type: 'lost',
      category: formData.category,
      location: formData.location,
      date: formData.date,
      description: formData.description.trim(),
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
      <div className="form-header-card lost-header">
        <button className="back-link-btn" onClick={() => navigate('items')}>
          <IconArrowLeft size={16} />
          <span>Back to directory</span>
        </button>
        <span className="badge badge-lost">Report Missing Item</span>
        <h1 className="form-page-title">Report a Lost Item</h1>
        <p className="form-page-desc">
          Provide as much accurate detail as possible so fellow students and campus staff can identify and notify you when found.
        </p>
      </div>

      <div className="form-content-card">
        <form onSubmit={handleSubmit} noValidate>
          {/* Section 1: Item Details */}
          <div className="form-section-title">
            <IconTag size={18} />
            <span>1. Item Details</span>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="item-name">
              Item Name <span className="req">*</span>
            </label>
            <input
              id="item-name"
              type="text"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="e.g. Blue Milton Water Bottle, Black Wildcraft Bag, HP Laptop"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="item-category">
                Category <span className="req">*</span>
              </label>
              <select
                id="item-category"
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
              <label className="form-label" htmlFor="item-date">
                Date Lost <span className="req">*</span>
              </label>
              <input
                id="item-date"
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
            <label className="form-label" htmlFor="item-location">
              Campus Location Where Lost <span className="req">*</span>
            </label>
            <select
              id="item-location"
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

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="item-desc">
              Detailed Description <span className="req">*</span>
            </label>
            <textarea
              id="item-desc"
              rows={4}
              className={`form-textarea ${errors.description ? 'input-error' : ''}`}
              placeholder="Describe color, brand, unique scratches, stickers, condition, contents, or circumstances..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
            <span className="helper-text">
              Include specific details that differentiate your item from similar ones.
            </span>
          </div>

          {/* Image Upload with Preview */}
          <div className="form-group">
            <label className="form-label">
              Upload Item Photo <span className="text-muted">(Recommended)</span>
            </label>

            {!imagePreview ? (
              <div className="upload-dropzone">
                <input
                  type="file"
                  id="image-file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input-hidden"
                />
                <label htmlFor="image-file" className="upload-dropzone-label">
                  <div className="upload-icon-circle">
                    <IconUpload size={24} />
                  </div>
                  <span className="upload-cta">Click or drag &amp; drop to upload item photo</span>
                  <span className="upload-hint">PNG, JPG, or JPEG (Auto-compressed for web)</span>
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
            <span>2. Your Contact Information</span>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="student-name">
                Your Full Name <span className="req">*</span>
              </label>
              <input
                id="student-name"
                type="text"
                className={`form-input ${errors.reporterName ? 'input-error' : ''}`}
                placeholder="e.g. Ananya Sharma"
                value={formData.reporterName}
                onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
              />
              {errors.reporterName && <span className="error-text">{errors.reporterName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="student-email">
                Contact College Email <span className="req">*</span>
              </label>
              <input
                id="student-email"
                type="email"
                className={`form-input ${errors.reporterEmail ? 'input-error' : ''}`}
                placeholder="e.g. ananya.s@college.edu"
                value={formData.reporterEmail}
                onChange={(e) => setFormData({ ...formData, reporterEmail: e.target.value })}
              />
              {errors.reporterEmail && <span className="error-text">{errors.reporterEmail}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="student-phone">
              Phone / WhatsApp Number <span className="text-muted">(Optional)</span>
            </label>
            <input
              id="student-phone"
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
              {isSubmitting ? 'Publishing Lost Item Report...' : 'Publish Lost Item Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
