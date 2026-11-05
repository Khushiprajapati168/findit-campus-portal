import React, { useState, useMemo } from 'react';
import { ItemCard } from '../components/ItemCard';
import { SearchBar } from '../components/SearchBar';
import { FilterSection } from '../components/FilterSection';
import { IconSearch, IconPlus, IconRotate, IconAlertCircle } from '../components/Icons';

export const Items = ({
  items = [],
  initialFilter = {},
  onViewDetails,
  navigate
}) => {
  const [searchQuery, setSearchQuery] = useState(initialFilter.search || '');
  const [typeFilter, setTypeFilter] = useState(initialFilter.type || 'all'); // 'all' | 'lost' | 'found'
  const [categoryFilter, setCategoryFilter] = useState(initialFilter.category || 'all');
  const [locationFilter, setLocationFilter] = useState(initialFilter.location || 'all');
  const [sortBy, setSortBy] = useState('newest');

  // Multi-attribute filtering with useMemo
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 1. Type filter
      if (typeFilter !== 'all' && item.type !== typeFilter) {
        return false;
      }

      // 2. Category filter
      if (categoryFilter !== 'all' && item.category !== categoryFilter) {
        return false;
      }

      // 3. Location filter
      if (locationFilter !== 'all' && item.location !== locationFilter) {
        return false;
      }

      // 4. Search query (name, description, location, category, reporterName)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = item.name?.toLowerCase().includes(query);
        const matchDesc = item.description?.toLowerCase().includes(query);
        const matchLoc = item.location?.toLowerCase().includes(query);
        const matchCat = item.category?.toLowerCase().includes(query);
        const matchReporter = item.reporterName?.toLowerCase().includes(query);

        if (!matchName && !matchDesc && !matchLoc && !matchCat && !matchReporter) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === 'oldest') {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortBy === 'az') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'za') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  }, [items, typeFilter, categoryFilter, locationFilter, searchQuery, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setCategoryFilter('all');
    setLocationFilter('all');
    setSortBy('newest');
  };

  // Counts for tabs
  const lostCount = items.filter((i) => i.type === 'lost').length;
  const foundCount = items.filter((i) => i.type === 'found').length;

  return (
    <div className="items-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Campus Lost &amp; Found Directory</h1>
          <p className="page-subtitle">
            Browse all reported items across campus. Use the search bar and filter controls below to locate your property.
          </p>
        </div>

        <div className="header-actions">
          <button
            className="btn btn-outline"
            onClick={() => navigate('report-lost')}
          >
            Report Lost
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate('report-found')}
          >
            Report Found
          </button>
        </div>
      </div>

      {/* Search Bar Bar */}
      <div className="items-search-container">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search by keywords, item name, model, color, or location..."
        />
      </div>

      {/* Filter and Content Layout */}
      <div className="items-layout">
        {/* Filters Panel */}
        <aside className="items-sidebar">
          <FilterSection
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onClearFilters={handleClearFilters}
            totalResults={filteredItems.length}
          />
        </aside>

        {/* Listings Grid */}
        <main className="items-main">
          {/* Quick Tab Headers */}
          <div className="type-tabs-bar">
            <button
              className={`type-tab ${typeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setTypeFilter('all')}
            >
              All Items ({items.length})
            </button>
            <button
              className={`type-tab ${typeFilter === 'lost' ? 'active' : ''}`}
              onClick={() => setTypeFilter('lost')}
            >
              Lost Items ({lostCount})
            </button>
            <button
              className={`type-tab ${typeFilter === 'found' ? 'active' : ''}`}
              onClick={() => setTypeFilter('found')}
            >
              Found Items ({foundCount})
            </button>
          </div>

          {/* Results Grid or Empty State */}
          {filteredItems.length > 0 ? (
            <div className="items-grid">
              {filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state-box">
              <div className="empty-state-icon">
                <IconSearch size={36} />
              </div>
              <h3 className="empty-state-title">No matching items found</h3>
              <p className="empty-state-desc">
                We couldn't find any listings matching your search criteria. Try removing some filters or searching for different keywords.
              </p>
              <div className="empty-actions">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={handleClearFilters}
                >
                  <IconRotate size={15} />
                  <span>Clear All Filters</span>
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate('report-lost')}
                >
                  <IconPlus size={15} />
                  <span>Report Your Lost Item</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
