import React, { useState } from 'react';
import { ItemCard } from '../components/ItemCard';
import { SearchBar } from '../components/SearchBar';
import { CATEGORIES } from '../data/mockData';
import {
  IconSearch,
  IconPlus,
  IconArrowRight,
  IconCheckCircle,
  IconClock,
  IconShield,
  IconTag,
  IconMapPin,
  IconSparkles
} from '../components/Icons';

export const Home = ({ items = [], navigate, onSelectCategory, onViewDetails }) => {
  const [homeSearch, setHomeSearch] = useState('');

  // Stats
  const totalReported = items.length;
  const returnedCount = items.filter(
    (i) => i.status === 'claimed' || i.status === 'returned'
  ).length;
  const activeListings = items.filter((i) => i.status === 'active').length;

  // Recent items (top 4 latest items)
  const recentItems = [...items].slice(0, 4);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('items', { search: homeSearch });
  };

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-pill">
            <IconSparkles size={14} />
            <span>Official Campus Lost &amp; Found Network</span>
          </div>

          <h1 className="hero-title">
            Lost Something? <br />
            <span className="hero-highlight">Let's Find It.</span>
          </h1>

          <p className="hero-subtitle">
            FindIt connects students, faculty, and campus staff to quickly report, track, and recover misplaced belongings across all campus halls, labs, and grounds.
          </p>

          {/* Quick CTA Buttons */}
          <div className="hero-cta-group">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('report-lost')}
            >
              <IconPlus size={18} />
              <span>Report Lost Item</span>
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => navigate('report-found')}
            >
              <IconCheckCircle size={18} />
              <span>Report Found Item</span>
            </button>
          </div>

          {/* Search Box in Hero */}
          <form className="hero-search-form" onSubmit={handleSearchSubmit}>
            <div className="hero-search-box">
              <IconSearch size={20} className="hero-search-icon" />
              <input
                type="text"
                placeholder="Search lost items (e.g. laptop, water bottle, ID card, keys...)"
                value={homeSearch}
                onChange={(e) => setHomeSearch(e.target.value)}
                className="hero-search-input"
              />
              <button type="submit" className="btn btn-primary btn-search-go">
                Search
              </button>
            </div>
          </form>

          {/* Quick tags */}
          <div className="hero-quick-tags">
            <span className="tags-label">Popular Searches:</span>
            {['ID Cards', 'Electronics', 'Keys', 'Wallets'].map((tag) => (
              <button
                key={tag}
                type="button"
                className="quick-tag-chip"
                onClick={() => onSelectCategory(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE STATS SECTION */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-blue">
              <IconTag size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-number">{totalReported}</span>
              <span className="stat-label">Total Items Reported</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-green">
              <IconCheckCircle size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-number">{returnedCount + 12}</span>
              <span className="stat-label">Successfully Returned</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-purple">
              <IconClock size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-number">{activeListings}</span>
              <span className="stat-label">Active Campus Listings</span>
            </div>
          </div>
        </div>
      </section>

      {/* RECENTLY REPORTED ITEMS SECTION */}
      <section className="section recent-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Recently Reported Items</h2>
            <p className="section-subtitle">
              Latest items reported lost or found by students and staff.
            </p>
          </div>
          <button
            className="btn btn-outline btn-sm btn-icon"
            onClick={() => navigate('items')}
          >
            <span>View All Listings</span>
            <IconArrowRight size={16} />
          </button>
        </div>

        <div className="items-grid">
          {recentItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="section categories-section">
        <div className="section-header text-center">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-subtitle">
            Find items faster by choosing a specific item classification.
          </p>
        </div>

        <div className="categories-grid">
          {CATEGORIES.map((category) => {
            const count = items.filter((i) => i.category === category).length;
            return (
              <div
                key={category}
                className="category-card"
                onClick={() => onSelectCategory(category)}
                role="button"
                tabIndex={0}
              >
                <div className="cat-icon-box">
                  <IconTag size={20} />
                </div>
                <div className="cat-details">
                  <h4 className="cat-name">{category}</h4>
                  <span className="cat-count">{count} {count === 1 ? 'item' : 'items'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="section how-it-works-section">
        <div className="section-header text-center">
          <div className="hero-pill center-pill">
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="section-title">How FindIt Works</h2>
          <p className="section-subtitle">
            A secure, student-friendly procedure to recover your misplaced belongings.
          </p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3 className="step-title">Report an Item</h3>
            <p className="step-desc">
              Lost something or found someone else's item? Post details with photo, date, and campus location in under 2 minutes.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3 className="step-title">Search &amp; Filter</h3>
            <p className="step-desc">
              Browse campus listings filtered by category, hall, or date. Use keyword search to match names or brands.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3 className="step-title">Submit a Claim</h3>
            <p className="step-desc">
              Spotted your found item? Fill in the claim form describing private identifying marks (stickers, serial, contents).
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">4</div>
            <h3 className="step-title">Safe Recovery</h3>
            <p className="step-desc">
              Once verified, coordinate safe handoff at verified campus desks (Library reception or Security Post).
            </p>
          </div>
        </div>
      </section>

      {/* CAMPUS ETHICS BANNER */}
      <section className="ethics-banner">
        <div className="ethics-content">
          <div className="ethics-icon">
            <IconShield size={32} />
          </div>
          <div className="ethics-text">
            <h3>Honesty Builds a Stronger Campus</h3>
            <p>
              Returning a lost item takes just a moment of your time, but saves a fellow student weeks of stress, lost lecture notes, or financial hardship. Let's make our campus a community of integrity.
            </p>
          </div>
          <div className="ethics-action">
            <button
              className="btn btn-primary"
              onClick={() => navigate('report-found')}
            >
              Report a Found Item
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
