import React from 'react';
import { IconSearch, IconX } from './Icons';

export const SearchBar = ({ searchQuery, setSearchQuery, placeholder = "Search by item name, keyword, brand, or color..." }) => {
  return (
    <div className="search-bar-wrapper">
      <div className="search-input-box">
        <IconSearch size={18} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="search-clear-btn"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
            type="button"
          >
            <IconX size={15} />
          </button>
        )}
      </div>
    </div>
  );
};
