import React from 'react';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data/mockData';
import { IconFilter, IconRotate } from './Icons';

export const FilterSection = ({
  typeFilter,
  setTypeFilter,
  categoryFilter,
  setCategoryFilter,
  locationFilter,
  setLocationFilter,
  sortBy,
  setSortBy,
  onClearFilters,
  totalResults
}) => {
  const isFiltered =
    typeFilter !== 'all' ||
    categoryFilter !== 'all' ||
    locationFilter !== 'all' ||
    sortBy !== 'newest';

  return (
    <div className="filter-card">
      <div className="filter-header">
        <div className="filter-title">
          <IconFilter size={18} />
          <span>Filters &amp; Sorting</span>
        </div>
        {isFiltered && (
          <button className="clear-filters-btn" onClick={onClearFilters}>
            <IconRotate size={14} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      <div className="filter-controls-grid">
        {/* Type Filter */}
        <div className="filter-group">
          <label className="filter-label">Listing Type</label>
          <div className="pill-group">
            <button
              type="button"
              className={`pill-btn ${typeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setTypeFilter('all')}
            >
              All Items
            </button>
            <button
              type="button"
              className={`pill-btn ${typeFilter === 'lost' ? 'active active-lost' : ''}`}
              onClick={() => setTypeFilter('lost')}
            >
              Lost
            </button>
            <button
              type="button"
              className={`pill-btn ${typeFilter === 'found' ? 'active active-found' : ''}`}
              onClick={() => setTypeFilter('found')}
            >
              Found
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="filter-group">
          <label htmlFor="filter-category" className="filter-label">Category</label>
          <select
            id="filter-category"
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="filter-group">
          <label htmlFor="filter-location" className="filter-label">Campus Location</label>
          <select
            id="filter-location"
            className="filter-select"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="all">All Campus Locations</option>
            {CAMPUS_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="filter-group">
          <label htmlFor="filter-sort" className="filter-label">Sort Listings</label>
          <select
            id="filter-sort"
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest Date First</option>
            <option value="oldest">Oldest Date First</option>
            <option value="az">Item Name (A to Z)</option>
            <option value="za">Item Name (Z to A)</option>
          </select>
        </div>
      </div>

      <div className="filter-footer-meta">
        <span className="results-count-text">
          Showing <strong>{totalResults}</strong> {totalResults === 1 ? 'item' : 'items'}
        </span>
      </div>
    </div>
  );
};
